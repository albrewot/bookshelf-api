const bcrypt = require("bcryptjs");
const AppError = require("../errors/AppError");
const { createHash } = require('crypto');

const passwordHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    if (hash) return hash;
  } catch (error) {
    throw new AppError("Error while encrypting password", 500);
  }
};
const password256Hash = async (password) => {
  try {
    const hash = await createHash('sha256').update(password).digest('hex');;
    if (hash) return hash;
  } catch (error) {
    throw new AppError("Error while encrypting password", 500);
  }
};

const compareHash = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    if (match) return match;
  } catch (error) {
    throw new AppError("Error while comparing encrypted password");
  }
};

const compare256Hash = async (password, hash) => {
  try {
    if(password == hash){
      return true;
    } else {
      throw new AppError("Password doesn't match");
    }
  } catch (error) {
    throw new AppError(error || "Error while comparing encrypted password");
  }
};
module.exports = {
  passwordHash,
  password256Hash,
  compareHash,
  compare256Hash
};
