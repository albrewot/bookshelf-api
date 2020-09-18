const bcrypt = require("bcryptjs");
const validate = require("../../validations/user");
const db = require("../../config/db");
const { User } = db;

class UserStore {
  create = async (body) => {
    try {
      const valid = validate("register", body);
      console.dir(valid);
      if (valid && valid.error) {
        throw valid.error;
      }
      if (await User.findOne({ username: body.username })) {
        throw {
          type: "TAKEN",
          message: `Username [${body.username}] is already taken`,
        };
      }
      if (await User.findOne({ email: body.email })) {
        throw {
          type: "TAKEN",
          message: `E-Mail [${body.email}] is already in use`,
        };
      }
      const user = new User(valid);
      const newUser = await User.create(user);
      if (newUser) {
        return newUser;
      } else {
        throw {
          type: "FAILURE",
          message: "User registration failed",
        };
      }
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
        } else {
          throw {
            type: "not found",
            message: `Username [${username}] was not found`,
          };
        }
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserStore();
