import { adjust, curry, fromPairs, map, toPairs } from 'ramda';
import { underscored, camelize } from 'underscore.string';
import { Model } from 'objection';

const mapKeys = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 0), toPairs(obj))));

export default class Base extends Model {
  $formatDatabaseJson(json) {
    const formattedJson = super.$formatDatabaseJson(json);

    return mapKeys(underscored, formattedJson);
  }

  $parseDatabaseJson(json) {
    return super.$parseDatabaseJson(mapKeys(camelize, json));
  }
}
