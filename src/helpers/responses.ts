// Utilizes the hapi-boom-decorators plugin, which also
// does not have type definitions, so it must be of type
// `any` until type definitions become available. We use
// this alongside `BaseError` as a catch-all for possible
// errors that aren't specified before it.

export function respondCustomError(reply: any) {
  return error => reply.boomify(error, {
    stausCode: error.code,
    message: error.message
  });
}
