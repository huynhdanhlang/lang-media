import { join } from 'path';
import { sequelize } from './config';
import { SequelizeTypescriptMigration } from '../utils/migration-tool';

const bootstrap = async (migrationName: string) => {
  await sequelize.transaction(async (transaction) => {
    await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: join(__dirname, './db/migrations'),
      migrationName: migrationName,
      preview: false,
      debug: true,
      useSnakeCase: false,
      transaction,
    });
  });
};
const migrationName: string = process.argv.slice(2).join().replace(/[,]/g, ' ');
bootstrap(migrationName)
  .then(() => sequelize.close())
  .catch((e) => {
    return process.exit(1);
  });
