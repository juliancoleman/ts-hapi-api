import * as Password from 'objection-password';
import * as Base from './base';

import { QueryBuilder } from 'objection';

export default class User extends Password(Base) {
  static tableName() {
    return 'users';
  }

  static QueryBuilder() {
    return class<T> extends QueryBuilder<T> {
      authorize(user) {
        const getAccessibleBananaIds = builder => builder
          .select('id')
          .from('')
          .innerJoin('', '')
          .innerJoin('users', '')
          .where('user.id', user.id);

        return this.query()
          .where('id', 'IN', getAccessibleBananaIds);
      }
    };
  }
}
