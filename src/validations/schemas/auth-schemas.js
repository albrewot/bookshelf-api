const Joi = require("joi");

const AuthLoginSchema = Joi.object()
  .keys({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
  })
  .or("username", "email");

module.exports = {
  AuthLoginSchema,
};
