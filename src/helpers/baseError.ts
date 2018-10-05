// The BaseError class extends the internal Error object.
// It allows us to create our own named errors for Bluebird
// to then perform a `filtered catch`.
// http://bluebirdjs.com/docs/api/catch.html#filtered-catch

export default class BaseError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
