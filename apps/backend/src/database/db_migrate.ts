import { join } from 'path';
import { sequelize } from './config';
import { SequelizeTypescriptMigration } from '@mandarvl/sequelize-typescript-migration';

const bootstrap = async (migrationName: string) => {
  await SequelizeTypescriptMigration.makeMigration(sequelize, {
    outDir: join(__dirname, './db/migrations'),
    migrationName: migrationName || `${Date.now().toString()}_auto_generate`,
    preview: false,
    debug: true,
    useSnakeCase: false,
  });
};
const migrationName: string = process.argv.slice(2).join().replace(/[,]/g, ' ');
bootstrap(migrationName)
  .then(() => sequelize.close())
  .finally(() => {
    return process.exit(1);
  });
