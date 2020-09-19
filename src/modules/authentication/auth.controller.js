const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Services
// const authStore = require("./auth.store");
//Middlewares
const {
  hasValidAuthFields,
  isPasswordUserMatch,
} = require("./auth.middleware");

//End-Points
router.post("/", [hasValidAuthFields, isPasswordUserMatch], login);

module.exports = router;

async function login(req, res, next) {
  try {
    const token = jwt.sign(req.body, process.env.JWT_SECRET);
    if (!token) {
      throw {
        type: "FAILURE",
        message: "Login Failed",
      };
    }
    res.status(201).json({
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
}
