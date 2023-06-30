const AppError = require("../../errors/AppError");
const express = require("express");
const uuid = require("uuid").v4;
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
router.post("/vinculate", [isPasswordUserMatch], vinculate);
router.post("/check_sms", checkSMS)
router.post("/refresh", refresh);
router.post("/secret", secret);
router.get("/test", [authGuard], test);

module.exports = router;

async function vinculate(req, res, next) {
  try {
    res.json({
      signUpTicket: uuid(),
      coordsChallenge: null,
      id: "V23000841",
      amiVen: false,
    });
  } catch (error) {
    next(error);
  }
}

async function checkSMS(req, res, next) {
  try {
    if (!req.body.signUpTicket || !req.body.sms) {
      throw AppError("SMS Verification Failed | Missing fields");
    }
    if (req.body.sms != "000000") {
      throw AppError("Invalid SMS code");
    }
    const { username, secret } = User.findOne({ username: "albcastle17" });
    return {
      userName: username,
      userSecret: secret,
    }
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    console.log(req.body);
    const { secret, ...body } = req.body;
    const token = jwt.sign(body, process.env.JWT_SECRET, {
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
    const { username } = jwt.decode(req.body.refresh);
    let user;
    if (!username) {
      throw new AppError("Login failed | Invalid TOken");
    }
    user = await User.findOne({ username: username });
    if (!user) {
      throw new AppError("Login failed | User Not Found");
    }
    const { userId, secret } = user;
    const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refresh = jwt.sign({ username: username }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '12d',
    });
    if (!token || !refresh) {
      throw new AppError("Login failed | Error while signing in");
    }
    res.status(201).json({
      access_token: token,
      refresh_token: refresh,
      secret: secret,
      userId: userId,
      username: username,
      // expiresIn: 7200000,
    });
  } catch (error) {
    next(error);
  }
}

async function secret(req, res, next) {
  try {
    const { secret } = req.body;
    if (!secret) {
      throw new AppError("Login failed | field not provided");
    }
    const user = User.findOne({ secret: secret });
    if (!user) {
      throw new AppError("Login failed | User Not Found");
    }
    const { userId, username } = user;
    const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refresh = jwt.sign({ username: username }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '12d',
    });
    if (!token || !refresh) {
      throw new AppError("Login failed | Error while signing in");
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
