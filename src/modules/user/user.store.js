const bcrypt = require("bcryptjs");
const AppError = require("../../errors/AppError");
const { compareHash } = require("../../helpers/password.helper");
const User = require("../../models/User");

class UserStore {
  create = async (body) => {
    try {
      if (await User.findOne({ username: body.username })) {
        throw new AppError(`Username [${body.username}] is already taken`, 409);
      }
      if (await User.findOne({ email: body.email })) {
        throw new AppError(`E-Mail [${body.email}] is already in use`, 409);
      }

      //Hash user password
      // const hash = await bcrypt.hash(body.password, 10);
      // if (hash) {
      //   body = Object.assign(body, { password: hash });
      // }
      const newUser = new User(body);
      const user = await User.create(newUser);
      return user;
    } catch (error) {
      throw error;
    }
  };

  edit = async (userId, body) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError(`User not found`, 404);
      }
      Object.assign(user, body);
      const editedUser = await user.save();
      return editedUser;
    } catch (error) {
      throw error;
    }
  };

  changePassword = async (userId, body) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      const match = await compareHash(body.password, user.password);
      if (!match) {
        throw new AppError("Incorrect Password", 401);
      }
      Object.assign(user, { password: body.newPassword });
      const editedUser = await user.save();
      return editedUser;
    } catch (error) {
      throw error;
    }
  };

  getUser = async (username) => {
    try {
      if (username) {
        const user = await User.findOne({ username });
        if (user) {
          return user;
        }
        throw new AppError(`Username [${username}] was not found`, 404);
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserStore();
