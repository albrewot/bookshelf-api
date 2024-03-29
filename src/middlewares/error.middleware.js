const helpers = require("../helpers/error.helper");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const sendError = (error, res) => {
  if (error.isOperational) {
    if ((process.env.NODE_ENV.trim() || "") === "dev") {
      helpers.sendErrorDev(error, res);
    } else if ((process.env.NODE_ENV.trim() || "") === "prod") {
      helpers.sendErrorProd(error, res);
    }
  } else {
    res.status(500).json({
      status: error.statusCode,
      message: "Something went wrong",
    });
  }
};

module.exports = (error, req, res, next) => {
  if (error) {
    error.statusCode = error.statusCode || 500;
    let parseError;
    if (error instanceof mongoose.Error.CastError)
      parseError = helpers.handleCastErrorDB(error);
    // if (error instanceof mongoose.Error.ValidationError)
    //   parseError = helpers.handleValidationErrorDB(error);
    if (error instanceof jwt.JsonWebTokenError) {
      parseError = helpers.handleJWTError(error);
    }
    if (error instanceof jwt.TokenExpiredError) {
      parseError = helpers.handleJWTExpired(error);
    }
    sendError(parseError ? parseError : error, res);
  }
};
