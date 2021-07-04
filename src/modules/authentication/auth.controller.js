const AppError = require("../../errors/AppError");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Services
// const authStore = require("./auth.store");
//Middlewares
const { isPasswordUserMatch, authGuard } = require("../../middlewares/auth.middleware");
const validateBody = require("../../middlewares/validateBody.middleware");

//End-Points
router.post("/", [validateBody, isPasswordUserMatch], login);
router.get("/test", [authGuard], test);

module.exports = router;

async function login(req, res, next) {
  try {
    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    if (!token) {
      throw new AppError("Login failed");
    }
    res.status(201).json({
      access_token: token,
      userId: req.body.userId,
      expiresIn: 7200000,
    });
  } catch (error) {
    next(error);
  }
}

function test(req, res, next) {
  try {
    res.send({ message: "Auth working" });
  } catch (error) {
    next(error);
  }
}
