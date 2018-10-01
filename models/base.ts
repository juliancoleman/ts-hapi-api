import { renameKeysWith } from "ramda-adjunct";
import { underscored, camelize } from "underscore.string";
import { Model } from "objection";

export default class Base extends Model {
  $formatDatabaseJson(json) {
    const formattedJson = super.$formatDatabaseJson(json);

    return renameKeysWith(underscored, formattedJson);
  }

  $parseDatabaseJson(json) {
    return super.$parseDatabaseJson(renameKeysWith(camelize, json));
  }
}
