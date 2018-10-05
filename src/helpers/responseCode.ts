// Rather than copy-pasta the whole spec, you can read
// about it at the link below. Here is an enum to map to
// each status code so that I don't have to remember the
// code itself, only what it means.
// https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

enum ResponseCode {
  // 1xx - Informational
  Continue                    = 100,
  SwitchingProtocols          = 101,

  // 2xx - Successful
  Ok                          = 200,
  Created                     = 201,
  Accepted                    = 202,
  NonAuthoritativeInformation = 203,
  NoContent                   = 204,
  ResetContent                = 205,
  PartialContent              = 206,

  // 3xx - Redirection
  MultipleChoices             = 300,
  MovedPermanently            = 301,
  Found                       = 302,
  SeeOther                    = 303,
  NotModified                 = 304,
  UseProxy                    = 305,
  UNUSED_SwitchProxy          = 306,
  TemporaryRedirect           = 307,

  // 4xx - Client Error
  BadRequest                  = 400,
  Unauthorized                = 401,
  PaymentRequired             = 402,
  Forbidden                   = 403,
  NotFound                    = 404,
  MethodNotAllowed            = 405,
  NotAcceptible               = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout              = 408,
  Conflict                    = 409,
  Gone                        = 410,
  LengthRequired              = 411,
  PreconditionFailed          = 412,
  RequestEntityTooLong        = 413,
  RequestUriTooLong           = 414,
  RequestURITooLong           = 414,
  UnsupportedMediaType        = 415,
  RequestRangeNotSatisfiable  = 416,
  ExpectationFailed           = 417,

  // 5xx - Server Error
  InternalServerError         = 500,
  NotImplemented              = 501,
  BadGateway                  = 502,
  ServiceUnavailable          = 503,
  GatewayTimeout              = 504,
  HttpVersionNotSupported     = 505,
  HTTPVersionNotSupported     = 505,
}

export default ResponseCode;
