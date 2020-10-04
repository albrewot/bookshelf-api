const AppError = require("../../errors/AppError");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Services
// const authStore = require("./auth.store");
//Middlewares
const { isPasswordUserMatch } = require("./auth.middleware");
const validateBody = require("../../middlewares/validateBody.middleware");

//End-Points
router.post("/", [validateBody, isPasswordUserMatch], login);

module.exports = router;

async function login(req, res, next) {
  try {
    const token = jwt.sign(req.body, process.env.JWT_SECRET);
    if (!token) {
      throw new AppError("Login failed");
    }
    res.status(201).json({
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
}
