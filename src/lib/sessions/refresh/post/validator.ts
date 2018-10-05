import * as Joi from "joi";

const validator = Joi.object().keys({
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/, "JWT")
    .required(),
}).unknown(false);

export default validator;
