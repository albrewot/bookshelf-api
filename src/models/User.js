const mongoose = require("../config/db");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "missing username"],
  },
  password: {
    type: String,
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
    unique: true,
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
  user_books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});

UserSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

module.exports = mongoose.model("User", UserSchema);
