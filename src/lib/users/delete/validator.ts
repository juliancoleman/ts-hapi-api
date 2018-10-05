import * as Joi from "joi";

const validator = Joi.object().keys({
  userId: Joi.number().integer().positive().required(),
}).unknown(false);

export default validator;
