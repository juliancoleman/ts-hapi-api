import * as Promise from "bluebird";
import * as jwt from "jsonwebtoken";


export const algorithm = "HS256";

export function signToken({ id: accountId }) {
  const expiresIn = "7d";

  return jwt.sign(
    { accountId },
    process.env.JWT_KEY as jwt.Secret,
    { algorithm, expiresIn }
  )
}

// export async function refreshToken(token = "") {
//   const decodedToken = await jwt.verify(token, process.env.JWT_KEY);

//   if (!decodedToken) { return null; }

//   const { accountId: id } = decodedToken;
// }

export async function validateToken(decodedToken, { accountId: id }) {

}
