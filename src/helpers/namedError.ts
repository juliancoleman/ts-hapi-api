import BaseError from "./baseError";

export default class NamedError extends BaseError {
  code: number;

  constructor(code: number, message: string) {
    super(message);

    this.code = code;
  }
}
