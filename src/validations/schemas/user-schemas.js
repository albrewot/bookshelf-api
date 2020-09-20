const Joi = require("joi");

const UserRegisterSchema = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  lastname: Joi.string(),
});

module.exports = {
  UserRegisterSchema,
};
