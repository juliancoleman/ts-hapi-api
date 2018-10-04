import * as Knex from "knex";

exports.up = (knex: Knex): Promise<any[]> => Promise.all([
  knex.schema.createTable("users", (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string("email_address");
    table.string("password");
    table.timestamps();
    table.timestamp("deleted_at");
  }),
]);

exports.down = (knex: Knex): Promise<any[]> => Promise.all([
  knex.schema.dropTable("users"),
]);
