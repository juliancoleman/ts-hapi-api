// tslint:disable:variable-name
import Base from "./base";

const Password = require("objection-password")();

export default class User extends Password(Base) {
  static tableName = "users";

  public readonly id: number;
  public firstName: string;
  public lastName: string;

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
