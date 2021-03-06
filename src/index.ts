import * as hapiRouteAutoloader from "@juliancoleman/hapi-route-autoloader";
import * as Hapi from "hapi";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";
import * as hapiBoomDecorators from "hapi-boom-decorators";
import * as Knex from "knex";
import { Model } from "objection";
import { defaultTo } from "ramda";

// Server configurations
import good from "./config/good";
import * as Knexfile from "./config/Knexfile";

// Services
import AuthenticationService from "./lib/authentication/service";

const { algorithm, validateToken: validate } = AuthenticationService;

// Initialize connection to database
const knex = Knex(Knexfile);
Model.knex(knex);

const DEFAULT_PORT = 3000;

// Create new Hapi server with debug option
const server = new Hapi.Server({
  debug: false,
  port: defaultTo(DEFAULT_PORT, process.env.PORT),
  routes: { cors: true },
});

function setServerAuthStrategy_d(server: Hapi.Server) {
  return (): Hapi.Server => {
    server.auth.strategy("jwt", "jwt", {
      validate,
      key: process.env.JWT_KEY,
      verifyOptions: { algorithms: [algorithm] },
    });

    server.auth.default("jwt");

    return server;
  };
}

// This warning does not show when run with Docker or
// Compose. Only when running `yarn dev` from project root.
function warnOnDefaultPort(): void {
  if (server.info.port === DEFAULT_PORT) {
    console.warn("\x1b[33m", " API is running on the default port.\n");
  }
}

async function startServer() {
  try {
    await server.register([
      hapiAuthJwt2,
      hapiBoomDecorators,
      hapiRouteAutoloader(`${__dirname}/controllers`),
      good,
    ])
    .then(setServerAuthStrategy_d(server));

    await server.start();

    console.info(`Server listening at ${server.info.uri}\n`);
    warnOnDefaultPort();
  } catch (e) {
    console.error(e);
  }
}

startServer();
