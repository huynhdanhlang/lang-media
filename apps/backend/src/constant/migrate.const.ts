export interface Json {
  [key: string]: any;
}

export interface MigrationState {
  revision?: number;
  version?: number;
  tables: Json;
}

export interface SequelizeMigrations {
  name: string;
  date: Date;
}

export interface SequelizeMigrationsMeta {
  revision: number;
  name: string;
  state: MigrationState;
  date: Date;
}
