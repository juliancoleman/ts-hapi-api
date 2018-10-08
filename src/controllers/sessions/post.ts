import * as Hapi from "hapi";

import AuthenticationService from "../../lib/authentication/service";
import Validator from "../../lib/sessions/post/validator";

import User, {
  UserNotFoundError,
  InvalidEmailPasswordError
} from "../../models/user";
import { respondCustomError } from "../../helpers/responses";

function post({ payload }: Hapi.RequestOrig, reply) {
  AuthenticationService.validateCredentials(payload)
    .then((user: User) => reply({ user, token: AuthenticationService.signToken(user) }))
    .catch(
      UserNotFoundError,
      InvalidEmailPasswordError,
      respondCustomError(reply)
    );
}

const route: Hapi.ServerRoute = {
  method: "POST",
  path: "/api/v1/sessions",
  handler: post,
  options: {
    auth: false,
    validate: {
      payload: Validator,
    },
  },
};

export default route;
