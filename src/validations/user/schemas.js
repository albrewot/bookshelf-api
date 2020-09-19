const Joi = require("@hapi/joi");

const UserRegisterSchema = Joi.object()
  .keys({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    lastname: Joi.string(),
  })
  .options({ abortEarly: false });

module.exports = {
  UserRegisterSchema,
};
