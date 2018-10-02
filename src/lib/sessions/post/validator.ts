import * as Joi from "joi";

const validator = Joi.object().keys({
  email_address: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).unknown(false);

export default validator;
