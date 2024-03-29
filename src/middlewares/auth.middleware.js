const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");
const { compareHas, compare256Hash } = require("../helpers/password.helper");
//Model
const User = require("../models/User");

//TODO - REFACTOR & CHECK USER MODEL SETTINGS

const isPasswordUserMatch = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // const match = await compareHash(req.body.password, user.password);
    const match = await compare256Hash(req.body.password, user.password);
    if (match) {
      req.body = {
        identification: user.customerID,
        // email: user.email,
        username: user.username,
        secret: user.secret,
        // name: user.name,
        // lastname: user.lastname,
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
          req.username = data.username;
          return next();
        }
        next(error);
      });
    } else {
      throw new AppError("Unauthenticated | No token provided", 401);
    }
  } catch (error) {
    next(error);
  }
};

const passGuard = (req, res, next) => {
  try {
    const basicHeader = req.headers.authorization;
    console.log(basicHeader);
    if (typeof basicHeader !== "undefined") {
      const basicCreds = basicHeader.split(" ")[1];
      console.log(basicCreds);
      const buffer = Buffer.from(basicCreds, "base64");
      const decoded = buffer.toString("ascii");
      console.log(decoded);
      const [username, password] = decoded.split(":");
      if (username !== "username" && password !== "password") {
        throw new AppError("Basic Authentication Failed");
      }
      return next();
    } else {
      throw new AppError("Unauthenticated | No Basic provided", 401);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isPasswordUserMatch,
  authGuard,
  passGuard,
};
