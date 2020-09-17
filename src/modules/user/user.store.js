const bcrypt = require("bcryptjs");
const db = require("../../config/db");
const { User } = db;

class UserStore {
  create = async (body) => {
    try {
      if (body) {
        const { username, password, email } = body;
        if (await User.findOne({ username })) {
          throw {
            type: "taken",
            message: `Username [${username}] is already taken`,
          };
        }
        if (await User.findOne({ email })) {
          throw {
            type: "taken",
            message: `E-mail [${email}] is already in use`,
          };
        }

        const user = new User(body);

        const hash = await bcrypt.hash(password, 10);

        user.password = hash;

        const newUser = await User.create(user);
        if (newUser) {
          return newUser;
        } else {
          throw {
            type: "failure",
            message: "Error while creating the user",
          };
        }
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserStore();
