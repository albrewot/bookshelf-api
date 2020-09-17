const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "missing username"],
  },
  password: {
    type: String,
    unique: true,
    required: [true, "missing password"],
  },
  name: {
    type: String,
    required: [true, "missing name"],
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "missing email"],
  },
  bithdate: {
    type: Date,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  profile_picture: {
    type: String,
    default: null,
  },
  session_token: {
    type: String,
    default: null,
  },
});

UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
