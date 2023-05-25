import { existsSync } from 'fs';
import beautify from 'js-beautify';
import type { Model, ModelCtor, Transaction } from 'sequelize/types';
import type { Sequelize } from 'sequelize-typescript';

import createMigrationTable from './createMigrationTable';
import getDiffActionsFromTables from './getDiffActionsFromTables';
import getLastMigrationState from './getLastMigrationState';
import getMigration from './getMigration';
import getTablesFromModels, {
  ReverseModelsOptions,
} from './getTablesFromModels';
import writeMigration from './writeMigration';
import { MigrationState } from '../../constant/migrate.const';

export type IMigrationOptions = {
  /**
   * directory where migration file saved. We recommend that you specify this path to sequelize migration path.
   */
  outDir: string;

  /**
   * if true, it doesn't generate files but just prints result action.
   */
  preview?: boolean;

  /**
   * migration file name, default is "noname"
   */
  migrationName?: string;

  /**
   * comment of migration.
   */
  comment?: string;

  debug?: boolean;

  transaction?: Transaction;
} & ReverseModelsOptions;
export type IWithTransactionOption = Pick<IMigrationOptions, 'transaction'>;
export class SequelizeTypescriptMigration {
  /**
   * generates migration file including up, down code
   * after this, run 'npx sequelize-cli db:migrate'.
   * @param sequelize sequelize-typescript instance
   * @param options options
   */
  public static makeMigration = async (
    sequelize: Sequelize,
    options: IMigrationOptions
  ) => {
    options.preview = options.preview || false;

    if (!existsSync(options.outDir))
      return Promise.reject(
        new Error(
          `${options.outDir} not exists. check path and if you did 'npx sequelize init' you must use path used in sequelize migration path`
        )
      );

    await sequelize.authenticate({
      transaction: options.transaction,
    });

    const models: {
      [key: string]: ModelCtor<Model>;
    } = sequelize.models;

    const queryInterface = sequelize.getQueryInterface();

    await createMigrationTable(sequelize, { transaction: options.transaction });

    const lastMigrationState = await getLastMigrationState(sequelize, {
      transaction: options.transaction,
    });
    const previousState: MigrationState = {
      revision: lastMigrationState?.revision ?? 0,
      version: lastMigrationState?.version ?? 1,
      tables: lastMigrationState?.tables ?? {},
    };
    const currentState: MigrationState = {
      revision: (previousState.revision || 0) + 1,
      tables: getTablesFromModels(sequelize, models, options),
    };

    const upActions = getDiffActionsFromTables(
      previousState.tables,
      currentState.tables
    );
    const downActions = getDiffActionsFromTables(
      currentState.tables,
      previousState.tables
    );

    const migration = getMigration(upActions);
    const tmp = getMigration(downActions);

    migration.commandsDown = tmp.commandsUp;

    if (migration.commandsUp.length === 0)
      return Promise.resolve({ msg: 'success: no changes found' });

    // log
    migration.consoleOut.forEach((v) => {
      console.log(`[Actions] ${v}`);
    });

    if (options.preview) {
      console.log('Migration result:');
      console.log(beautify(`[ \n${migration.commandsUp.join(', \n')} \n];\n`));
      console.log('Undo commands:');
      console.log(
        beautify(`[ \n${migration.commandsDown.join(', \n')} \n];\n`)
      );

      return Promise.resolve({ msg: 'success without save' });
    }

    const info = await writeMigration(currentState, migration, options);

    console.log(
      `New migration to revision ${currentState.revision} has been saved to file '${info.filename}'`
    );

    // save current state, Ugly hack, see https://github.com/sequelize/sequelize/issues/8310
    const rows = [
      {
        revision: currentState.revision,
        name: info.info.name,
        state: JSON.stringify(currentState),
      },
    ];

    try {
      await queryInterface.bulkDelete(
        'SequelizeMigrationsMeta',
        {
          revision: currentState.revision,
        },
        {
          transaction: options.transaction,
        }
      );
      await queryInterface.bulkInsert('SequelizeMigrationsMeta', rows, {
        transaction: options.transaction,
      });

      console.log(`Use sequelize CLI:
  npx sequelize db:migrate --to ${info.revisionNumber}-${
        info.info.name
      }.js ${`--migrations-path=${options.outDir}`} `);

      return await Promise.resolve({ msg: 'success' });
    } catch (err) {
      if (options.debug) console.error(err);
    }

    return Promise.resolve({ msg: 'success anyway...' });
  };
}
