const Joi = require("joi");

const UserRegisterSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  lastname: Joi.string(),
  username: Joi.string().required(),
  customerID: Joi.string().required(),
});

const UserEditSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  lastname: Joi.string(),
  gender: Joi.string(),
  birthdate: Joi.date(),
  // profile_picture: Joi.string(),
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
