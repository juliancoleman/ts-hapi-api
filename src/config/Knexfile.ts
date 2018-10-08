// tslint:disable:max-line-length

require("dotenv").config({ path: "../../.env" });

import { Config, PoolConfig, MigratorConfig } from "knex";
import * as pg from "pg";

// Parse stringified BIGINTs from Postgres
const numberTypes: number[] = [700, 701, 1700, 20, 20, 1021, 1022, 1231];
numberTypes.forEach((type: number) =>
  pg.types.setTypeParser(type, "text", parseFloat)
);

const client: string = "pg";
const pool: Readonly<PoolConfig> = { min: 2, max: 10 };
const migrations: Readonly<MigratorConfig> = {
  directory: "../migrations",
  disableTransactions: true,
};

// Do not set any defaults on these environment variables.
// Let dotenv fail silently and let the database fail to
// connect.
const connection: string = `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}_db_1:5432`;

module.exports = <Config> {
  client,
  connection,
  migrations,
  pool,
};
