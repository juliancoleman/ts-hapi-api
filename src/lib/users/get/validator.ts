import * as Joi from "joi";

// Eventually, I would like to use enums here for the
// `valid` types.
// `pageSize` and `page` are attributes allowed by using
// Objection.

const singularValidator = Joi.object().keys({
  userId: Joi.number().integer().positive().required(),
}).unknown(false);

const pluralValidator = Joi.object().keys({
  email_address: Joi.string().email(),
  pageSize: Joi.number().integer().positive().default(10),
  page: Joi.number().integer().positive().default(1),
  sort: Joi.string().valid([
    "email_address",
  ]).default("email_address"),
}).unknown(false);
