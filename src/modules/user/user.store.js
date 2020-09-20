const bcrypt = require("bcryptjs");
const User = require("../../models/User");

class UserStore {
  create = async (body) => {
    try {
      if (await User.findOne({ username: body.username })) {
        throw new Error(`Username [${body.username}] is already taken`);
      }
      if (await User.findOne({ email: body.email })) {
        throw new Error(`E-Mail [${body.email}] is already in use`);
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
        throw new Error(`Username [${username}] was not found`);
      }
    } catch (error) {
      console.log(error);
      throw error.message;
    }
  };
}

module.exports = new UserStore();
