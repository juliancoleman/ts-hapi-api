// tslint:disable:max-line-length
import * as Bluebird from "bluebird";
import * as jsonwebtoken from "jsonwebtoken";

// http://bluebirdjs.com/docs/api/promise.promisifyall.html
// Unfortunately, this needs to be of type `any` because
// there are no type definitions for promisified
// NodeFunctions. If you need to access the original type
//  definitions, look at the signature without the `-Async`
// suffix.
const jwt: any = Bluebird.promisifyAll(jsonwebtoken);

import User from "../../models/user";
import { Readable } from "stream";

interface IAuthenticationIsValid {
  isValid: boolean;
}

interface IDecodedToken {
  accountId: number;
}

export default class AuthenticationService {
  static algorithm: string = "HS256";

  // No need to null-check this function since it's only used
  // in `refreshToken`, which must return a valid `accountId`.
  static signToken = ({ id: accountId }): string => {
    const expiresIn: string = "7d";
    const { algorithm } = AuthenticationService;

    return jwt.sign(
      { accountId },
      (process.env.JWT_KEY as jsonwebtoken.Secret),
      { expiresIn, algorithm }
    );
  }

  static refreshToken = async (token = "") => {
    const decodedToken = await jwt.verifyAsync(token, process.env.JWT_KEY as string);

    if (!decodedToken) { return null; }

    const { accountId }: IDecodedToken = decodedToken;
    const user: User = await User
      .query()
      .findById(accountId)
      .throwIfNotFound();

    return AuthenticationService.signToken(user);
  }

  static validateToken = async ({ accountId }): Promise<IAuthenticationIsValid> => {
    const user: User = await User
      .query()
      .findById(accountId);

    if (!user) {
      return ({ isValid: false });
    }

    return ({ isValid: true });
  }

  static validateCredentials = Bluebird.method(async ({ email_address = "", password = "" }) => {
    const user: User = await User
      .query()
      .where({ email_address })
      .throwIfNotFound();

    return user
      .verifyPassword(password)
      .then((isValid) => {
        if (!isValid) {
          throw new Error("Invalid email or password"); // throw a more appropriate error with the proper status code
        }

        return user;
      });
  });
}
