const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
//Model
const User = require("../models/User");

//TODO - REFACTOR & CHECK USER MODEL SETTINGS

const isPasswordUserMatch = async (req, res, next) => {
  try {
    let user;
    if (req.body.email) {
      user = await User.findOne({ email: req.body.email });
    } else {
      user = await User.findOne({ username: req.body.username });
    }
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
    throw new AppError("Incorrect Password", 400);
  } catch (error) {
    next(error);
  }
};

const authGuard = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      jwt.verify(bearerToken, process.env.JWT_SECRET, (error, data) => {
        if (!error) {
          return next();
        }
        console.log(error);
        next(error);
      });
    } else {
      throw new AppError("Unauthenticated | No token provided", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isPasswordUserMatch,
  authGuard,
};
