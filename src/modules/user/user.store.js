const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const dir = path.join(global.rootPath, "/public/images/pfp/");
const AppError = require("../../errors/AppError");
const { compareHash } = require("../../helpers/password.helper");
const User = require("../../models/User");

class UserStore {
  create = async (body) => {
    try {
      const found = await User.find({"$or": [
        { username: body.username },
        { email: body.email },
        { customerID: body.customerID }
      ],})
      if (found.length > 0) {
        throw new AppError(`Unique Field is already in use`, 409);
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

  edit = async (userId, body, filename = null) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError(`User not found`, 404);
      }
      if (filename && user.profile_picture && user.profile_picture !== body.profile_picture) {
        const userPfp = user.profile_picture.split("/").pop();
        const fileExists = fs.existsSync(dir + userPfp);
        if (fileExists) {
          fs.unlink(dir + userPfp, (err) => {
            if (err) {
              console.log("UNLINK ERROR", err);
              throw err;
            }
          });
        }
      }
      //console.log
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
        const user = await User.find({username});
        if (user) {
          return user;
        }
        throw new AppError(`User [${username}] was not found`, 404);
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserStore();
