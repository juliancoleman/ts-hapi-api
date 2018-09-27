import * as hapiRouteAutoloader from "@juliancoleman/hapi-route-autoloader";
import * as Hapi from "hapi";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";
import * as Knex from "knex";
import { Model } from "objection";
import { defaultTo } from "ramda";

import good from "./config/good";
import Knexfile from "./config/Knexfile";

import { algorithm, validateToken as validate } from './lib/authentication/service';


// Initialize connection to database
const knex = Knex(Knexfile);
Model.knex(knex);

// Create new Hapi server with debug option
const server = new Hapi.Server({
  debug: false,
  port: defaultTo(3000, process.env.PORT),
  routes: { cors: true },
});

async function startServer() {
  try {
    await server.register([
      hapiAuthJwt2,
      hapiRouteAutoloader(`${__dirname}/controllers`),
      good,
    ])
    .then(() => {
      server.auth.strategy("jwt", "jwt", {
        key: process.env.KEY,
        validate,
        verifyOptions: { algorithms: [algorithm] },
      });

      server.auth.default("jwt");

      return server;
    });

    await server.start();

    console.info(`Server listening on port ${server.info.port}`);
  } catch (e) {
    console.error(e);
  }
}

startServer();
