const Joi = require("joi");
const { AuthLoginSchema } = require("./schemas/auth-schemas");
const { UserRegisterSchema } = require("./schemas/user-schemas");
const { BookRegisterSchema, BookFindSchema } = require("./schemas/book-schemas");

const JoiValidator = (body, schema) => {
  const { error, value } = schema.validate(body, { abortEarly: false });
  if (error) {
    const message = error.details.map((el) => {
      return el.message;
    });
    return {
      error: message.join(" | "),
    };
  }
  return value;
};

const validator = {
  authValidator: (body) => JoiValidator(body, AuthLoginSchema),
  userRegisterValidator: (body) => JoiValidator(body, UserRegisterSchema),
  bookRegisterValidator: (body) => JoiValidator(body, BookRegisterSchema),
  bookFindValidator: (body) => JoiValidator(body, BookFindSchema),
};

module.exports = validator;
