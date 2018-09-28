// tslint:disable:max-line-length
import * as jwt from "jsonwebtoken";

interface IAuthenticationIsValid {
  isValid: boolean;
}

export default class AuthenticationService {
  static algorithm: string = "HS256";

  // No need to null-check this function since it's only used
  // in `refreshToken`, which must return a valid `accountId`.
  static signToken = ({ id: accountId }): string => {
    const expiresIn: string = "7d";

    return jwt.sign(
      { accountId },
      process.env.JWT_KEY as jwt.Secret,
      { expiresIn, algorithm: AuthenticationService.algorithm }
    );
  }

  // export async function refreshToken(token = "") {
  //   const decodedToken = await jwt.verify(token, process.env.JWT_KEY);

  //   if (!decodedToken) { return null; }

  //   const { accountId: id } = decodedToken;
  // }

  static validateToken = async (decodedToken, { accountId: id }): Promise<IAuthenticationIsValid> => {
    // TODO: convert the following to TS/Hapi 17
    // https://github.com/juliancoleman/js-hapi-api/blob/master/lib/authentication/service.js#L29-L49
    return ({ isValid: true });
  }

  static validateCredentials = async ({ email_address = "", password = "" }) => {

  }
}
