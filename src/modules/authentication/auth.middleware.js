const bcrypt = require("bcryptjs");
const AppError = require("../../errors/AppError");
//Validation
//Model
const User = require("../../models/User");

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

module.exports = {
  isPasswordUserMatch,
};
