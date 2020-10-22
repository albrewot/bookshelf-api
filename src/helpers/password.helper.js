const bcrypt = require("bcryptjs");
const AppError = require("../errors/AppError");

const passwordHash = async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
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
module.exports = {
  passwordHash,
  compareHash,
};
