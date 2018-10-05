import * as Joi from "joi";

const validator = Joi.object().min(1).keys({
  email_address: Joi.string().email(),
}).unknown(false);

export default validator;
