import { join } from 'path';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';
import { sequelize } from './config';

const bootstrap = async (migrationName: string) => {
  await SequelizeTypescriptMigration.makeMigration(sequelize, {
    outDir: join(__dirname, './db/migrations'),
    migrationName: migrationName,
    preview: false,
    debug: true,
    useSnakeCase: false,
  });
};
const migrationName: string = process.argv.slice(2).join().replace(/[,]/g, ' ');
bootstrap(migrationName)
  .then(() => sequelize.close())
  .catch((e) => {
    return process.exit(1);
  });
