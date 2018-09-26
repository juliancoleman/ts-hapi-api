import * as Hapi from "hapi";
import * as Knex from "knex";
import { Model } from "objection";
import { defaultTo } from "ramda";

import Knexfile from "./config/Knexfile";

// Initialize connection to database
const knex = Knex(Knexfile);
Model.knex(knex);

// Create new Hapi server with debug option
const server = new Hapi.Server({
  debug: false,
  port: defaultTo(3000, process.env.PORT),
  routes: { cors: true },
});
