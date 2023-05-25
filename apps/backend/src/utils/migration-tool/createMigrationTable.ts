import {
  DataType as SequelizeTypescriptDataType,
  Sequelize,
} from 'sequelize-typescript';
import { IWithTransactionOption } from '.';

export default async function createMigrationTable(
  sequelize: Sequelize,
  options: IWithTransactionOption = {}
) {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable(
    'SequelizeMeta',
    {
      name: {
        type: SequelizeTypescriptDataType.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      date: {
        type: SequelizeTypescriptDataType.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    },
    { transaction: options.transaction }
  );
  await queryInterface.createTable(
    'SequelizeMigrationsMeta',
    {
      revision: {
        type: SequelizeTypescriptDataType.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: SequelizeTypescriptDataType.STRING,
        allowNull: false,
      },
      state: {
        type: SequelizeTypescriptDataType.JSON,
        allowNull: false,
      },
      date: {
        type: SequelizeTypescriptDataType.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    },
    { transaction: options.transaction }
  );
}
