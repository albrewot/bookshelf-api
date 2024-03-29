const mongoose = require("../config/db");
const { passwordHash, password256Hash } = require("../helpers/password.helper");
const { Schema } = mongoose;
const uuid = require("uuid").v4;

const UserSchema = new Schema({
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
  username: {
    type: String,
    unique: true,
    required: [true, "missing username"],
  },
  customerID: {
    type: String,
    unique: true,
    required: [true, "missing CustomerID"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "missing email"],
  },
  secret: {
    type: String,
    unique: true,

  },
  birthdate: {
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
    delete ret.secret;
  },
});

UserSchema.pre("save", async function (next) {
  try {
    let user = this;
    if(this.isNew){
      user = Object.assign(user, { secret: uuid()});
    }
    if (!user.isModified("password")) return next();
    // const hash = await passwordHash(user.password);
    const hash = await password256Hash(user.password);
    if (hash) {
      user = Object.assign(user, { password: hash });
    }
  } catch (error) {
    next(error);
  }
});

UserSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email });
};

module.exports = mongoose.model("User", UserSchema);
