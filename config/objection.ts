import * as Knex from 'knex';
import { Model } from 'objection';

const knexfile = require('./Knexfile');

export const knex = Knex(knexfile);

Model.knex(knex);

