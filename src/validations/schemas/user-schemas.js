const Joi = require("joi");

const UserRegisterSchema = Joi.object().keys({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  lastname: Joi.string(),
});

const UserEditSchema = Joi.object().keys({
  username: Joi.string(),
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  lastname: Joi.string(),
});

const UserChangePasswordSchema = Joi.object().keys({
  password: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports = {
  UserRegisterSchema,
  UserEditSchema,
  UserChangePasswordSchema,
};
