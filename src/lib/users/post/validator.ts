import * as Joi from "joi";

// For more information on `language`, follow the link
// below:
// https://github.com/hapijs/joi/blob/v13.7.0/API.md#validatevalue-schema-options-callback
const validator = Joi.object().keys({
  email_address: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirm_password: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({
      language: {
        any: {
          allowOnly: "Passwords must match.",
        }
      }
    }),
}).unknown(false);

export default validator;
