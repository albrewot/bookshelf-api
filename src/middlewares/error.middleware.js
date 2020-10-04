const helpers = require("../errors/helpers");
const mongoose = require("mongoose");

const sendError = (error, res) => {
  if (error.isOperational) {
    if ((process.env.NODE_ENV.trim() || "") === "development") {
      helpers.sendErrorDev(error, res);
    } else if ((process.env.NODE_ENV.trim() || "") === "production") {
      helpers.sendErrorProd(error, res);
    }
  } else {
    // console.log("ERROR", error);
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
    sendError(parseError ? parseError : error, res);
  }
};
