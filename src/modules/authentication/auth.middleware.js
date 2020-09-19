const crypto = require("crypto");
const bcrypt = require("bcryptjs");
//Validation
const validationSchemas = require("../../validations/auth/schemas");
const validateAuth = require("../../validations/auth");
//Model
const { User } = require("../../config/db");

//TODO - REFACTOR & CHECK USER MODEL SETTINGS

const hasValidAuthFields = (req, res, next) => {
  try {
    const validBody = validateAuth(validationSchemas.AuthLoginSchema, req.body);
    if (validBody && validBody.error) {
      throw { message: validBody.error.join(" ,") };
    }
    req.body = validBody;
    return next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isPasswordUserMatch = async (req, res, next) => {
  try {
    let user;
    if (req.body.username) {
      console.log(User);
      user = await User.findOne({ username: req.body.username });
    } else {
      user = await User.findOne({ email: req.body.email });
    }
    console.log(user);
    const hash = await bcrypt.compare(req.body.password, user.password);
    if (hash) {
      req.body = {
        userid: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        lastname: user.lastname,
      };
      return next();
    }
    throw {
      type: "FAILURE",
      message: "Incorrect Password",
    };
  } catch (error) {
    next(error);
  }
};

module.exports = {
  hasValidAuthFields,
  isPasswordUserMatch,
};
