const Joi = require("joi");

const AuthLoginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  AuthLoginSchema,
};
