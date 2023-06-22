# Welcome to the database setup

## Requirements

- Sequelize and sequelize-cli
- Postgres

## More info about sequelize

- [Follow nestjs docs](https://docs.nestjs.com/techniques/database#sequelize-integration)

## Init sequelize project: `npx sequelize init`

## Sequelize-cli

- Two method create model: using sequelize-cli and manual.
  - With sequelize-cli run (not recommend (hard to reach)):
    - `npx sequelize model:generate --name <name_of_model> --attributes <field_with_type_via_comma>`
      or
    - `npx sequelize model:create --name <name_of_model> --attributes <field_with_type_via_comma>`
    - Ex: `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
  - With manual (recommend (typescript better)):
    - Create file into `database/models` and definition

## Seeders and migrations

### Migration

- Create new change migration
  `npm run migrate --command="<message your change>"`
- Apply migrations into db
  `npm run db:migrate:apply`
- Migrate info command
  `npm run db:migrate --help`

### Seeders

- Create new seed
  `npx sequelize seed:generate --name <file_name>` or
  `npx sequelize seed:create --name <file_name>`
- Run a seed file
  `npx sequelize db:seed --seed <file_name>`
- RUn all seed
  `npm run db:seed`

### References

- [Sequelize migrations](https://sequelize.org/docs/v6/other-topics/migrations/)
- [Decorators and some other features for sequelize](https://github.com/sequelize/sequelize-typescript)
- [migration tool ( make migration ) for sequelize and typescript developers. (best forked projects conclusion)](https://github.com/mmRoshani/sequelize-typescript-migration)
