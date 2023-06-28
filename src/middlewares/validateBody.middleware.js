const AppError = require("../errors/AppError");
const validator = require("../validations");

const appValidator = (path, body) => {
  switch (path) {
    case "/user/register":
      return validator.userRegisterValidator(body);
    case "/user/edit":
      return validator.userEditValidator(body);
    case "/user/edit/password":
      return validator.userChangePasswordValidator(body);
    case "/books/create":
      return validator.bookRegisterValidator(body);
    case "/auth/login":
      return validator.authValidator(body);
    default:
      return { error: "Invalid request" };
  }
};

module.exports = async (req, res, next) => {
  try {
    const validBody = appValidator(req.originalUrl, req.body);
    if (validBody && validBody.error) {
      throw new AppError(validBody.error, 400);
    }
    req.body = validBody;
    return next();
  } catch (error) {
    next(error);
  }
};
