import * as hapiRouteAutoloader from "@juliancoleman/hapi-route-autoloader";
import * as Hapi from "hapi";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";
import * as Knex from "knex";
import { Model } from "objection";
import { defaultTo } from "ramda";

import good from "./config/good";
import * as Knexfile from "./config/Knexfile";

import AuthenticationService from "./lib/authentication/service";

const { algorithm, validateToken: validate } = AuthenticationService;

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
        validate,
        key: process.env.JWT_KEY,
        verifyOptions: { algorithms: [algorithm] },
      });

      server.auth.default("jwt");

      return server;
    });

    await server.start();

    console.info(`Server listening at ${server.info.uri}\n`);

    if (server.info.port !== process.env.PORT) {
      const yellow = "\x1b[33m";
      console.warn(yellow, " API is running on the default port.\n");
    }
  } catch (e) {
    console.error(e);
  }
}

startServer();
