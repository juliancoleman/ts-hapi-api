// tslint:disable:variable-name

import Base from "./base";

import NamedError from "../helpers/namedError";
import ResponseCode from "../helpers/responseCode";

const Password = require("objection-password")();

export class UserNotFoundError extends NamedError { }
export class UserAlreadyExistsError extends NamedError { }
export class InvalidEmailPasswordError extends NamedError { }

export default class User extends Password(Base) {
  static tableName = "users";
  static NotFoundError = new UserNotFoundError(ResponseCode.NotFound, "User not found.");

  public readonly id!: number;
  public email_address!: string;
  public firstName: string;
  public lastName: string;

  static createNotFoundError(): UserNotFoundError {
    return this.NotFoundError;
  }

  // static QueryBuilder() {
  //   return class<T> extends QueryBuilder<T> {
  //     authorize(user) {
  //       const getAccessibleBananaIds = builder => builder
  //         .select("id")
  //         .from(")
  //         .innerJoin(", ")
  //         .innerJoin("users", ")
  //         .where("user.id", user.id);

  //       return this.query()
  //         .where("id", "IN", getAccessibleBananaIds);
  //     }
  //   };
  // }
}
