// tslint:disable:max-line-length
import * as jwt from "jsonwebtoken";

import User from "../../models/user";

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
      (process.env.JWT_KEY as jwt.Secret),
      { expiresIn, algorithm }
    );
  }

  static refreshToken = async (token = "") => {
    const decodedToken = await jwt.verify(token, process.env.JWT_KEY as string);

    if (!decodedToken) { return null; }

    const { accountId } = decodedToken as IDecodedToken;
    const user = await User // all model-returns need valid types other than `any`
      .query()
      .findById(accountId)
      .throwIfNotFound();

    return AuthenticationService.signToken(user);
  }

  static validateToken = async ({ accountId }): Promise<IAuthenticationIsValid> => {
    const user = await User
      .query()
      .findById(accountId);

    if (!user) {
      return ({ isValid: false });
    }

    return ({ isValid: true });
  }

  static validateCredentials = async ({ email_address = "", password = "" }) => {
    const user = await User
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
  }
}
