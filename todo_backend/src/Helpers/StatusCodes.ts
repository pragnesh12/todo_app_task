export enum StatusCode {
  // Success
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // Redirection
  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  // Client Errors
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  Gone = 410,
  UnsupportedMediaType = 415,
  UnprocessableEntity = 422,
  TooManyRequests = 429,

  // Server Errors
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}