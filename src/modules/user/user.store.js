const bcrypt = require("bcryptjs");
const AppError = require("../../errors/AppError");
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
      const hash = await bcrypt.hash(body.password, 10);
      if (hash) {
        body = Object.assign(body, { password: hash });
      }
      const newUser = new User(body);
      const user = await User.create(newUser);
      return user;
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
