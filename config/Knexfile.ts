require('dotenv').config();

import * as pg from 'pg';

// Parse stringified BIGINTs from Postgres
const numberTypes: number[] = [700, 701, 1700, 20, 20, 1021, 1022, 1231];
numberTypes.forEach(type => pg.types.setTypeParser(type, 'text', parseFloat));

export const Knexfile = { // tslint:disable-line
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_POSTGRESQL_USERNAME,
    password: process.env.DATABASE_POSTGRESQL_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  migrations: {
    directory: '../migrations',
    tableName: 'knex_migrations',
    disableTransactions: true,
  },
};
