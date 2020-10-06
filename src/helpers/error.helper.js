const AppError = require("../errors/AppError");

const handleCastErrorDB = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400);
};

// const handleValidationErrorDB = (error) => {
//   const errors = Object.values(error.errors).map((el) => el.message);
//   const message = `Invalid input data. ${errors.join(". ")}`;
//   return new AppError(message, 400);
// };

const handleJWTError = (error) => {
  const message = error.message;
  return new AppError(message, 401);
};

const handleJWTExpired = (error) => {
  const message = `${error.message} | expired at: ${error.expiredAt}`;
  return new AppError(message, 401);
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    error,
    status: error.statusCode,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};

module.exports = {
  handleCastErrorDB,
  // handleValidationErrorDB,
  handleJWTError,
  handleJWTExpired,
  sendErrorDev,
  sendErrorProd,
};
