// tslint:disable:max-line-length

import { Config, PoolConfig, MigratorConfig, ConnectionConfig } from "knex";
import * as dotenv from "dotenv";
import * as pg from "pg";

dotenv.config();

// Parse stringified BIGINTs from Postgres
const numberTypes: number[] = [700, 701, 1700, 20, 20, 1021, 1022, 1231];
numberTypes.forEach((type: number) =>
  pg.types.setTypeParser(type, "text", parseFloat)
);

const client: string = "postgresql";
const pool: Readonly<PoolConfig> = { min: 2, max: 10 };
const migrations: Readonly<MigratorConfig> = {
  directory: "../migrations",
  disableTransactions: true,
};
const connection: Readonly<ConnectionConfig> = {
  host: process.env.DATABASE_HOST as string,
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string, // this needs infinitely more security around it
  database: process.env.DATABASE_NAME as string,
};

module.exports = <Config> {
  client,
  connection,
  migrations,
  pool,
};
