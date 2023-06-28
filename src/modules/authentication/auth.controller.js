const AppError = require("../../errors/AppError");
const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Services
// const authStore = require("./auth.store");
//Middlewares
const { isPasswordUserMatch, authGuard } = require("../../middlewares/auth.middleware");
const validateBody = require("../../middlewares/validateBody.middleware");

//End-Points
router.post("/login", [validateBody, isPasswordUserMatch], login);
router.post("/refresh", refresh);
router.post("/secret", secret);
router.get("/test", [authGuard], test);

module.exports = router;

async function login(req, res, next) {
  try {
    console.log(req.body);
    const token = jwt.sign(req.body, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refresh = jwt.sign({ username: req.body.username }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '12d',
    });
    if (!token || !refresh) {
      throw new AppError("Login failed");
    }
    res.status(201).json({
      access_token: token,
      refresh_token: refresh,
      secret: req.body.secret,
      userId: req.body.userId,
      username: req.body.username,
      // expiresIn: 7200000,
    });
  } catch (error) {
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const result = jwt.decode(req.refresh);
    const refresh = jwt.sign({ username: req.body.username }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '12d',
    });
    if (!token || !refresh) {
      throw new AppError("Login failed");
    }
    res.status(201).json({
      access_token: token,
      refresh_token: refresh,
      secret: req.body.secret,
      userId: req.body.userId,
      username: req.body.username,
      // expiresIn: 7200000,
    });
  } catch (error) {
    next(error);
  }
}

async function secret(req, res, next) {
  try {
    const refresh = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    if (!refresh) {
      throw new AppError("Login failed");
    }
    res.status(201).json({
      access_token: token,
      refresh_token: refresh,
      secret: req.body.secret,
      userId: req.body.userId,
      username: req.body.username,
      // expiresIn: 7200000,
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
