const AppError = require("../../errors/AppError");
const express = require("express");
const uuid = require("uuid").v4;
const User = require("../../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
//Services
// const authStore = require("./auth.store");
//Middlewares
const { isPasswordUserMatch, authGuard, passGuard } = require("../../middlewares/auth.middleware");
const validateBody = require("../../middlewares/validateBody.middleware");

//End-Points
router.post("/login", [validateBody, isPasswordUserMatch], login);
router.post("/vinculate", [isPasswordUserMatch], vinculate);
router.post("/sms", checkSMS)
router.post("/authenticate", [passGuard], basicAuth);
router.get("/test", [authGuard], test);

module.exports = router;

async function vinculate(req, res, next) {
  try {
    res.json({
      code: 1000,
      data: {
        signUpTicket: uuid(),
        coordsChallenge: null,
        identification: req.body.identification,
        amiVen: "FALSE",
      },
      message: "Peticion realizada con exito"
    });
  } catch (error) {
    next(error);
  }
}

async function checkSMS(req, res, next) {
  try {
    if (!req.body.ticket || !req.body.af || !req.body.username) {
      throw AppError("SMS Verification Failed | Missing fields");
    }
    if (req.body.af !== "000000") {
      throw AppError("Invalid SMS code");
    }
    const { username, secret } = await User.findOne({ username: req.body.username });
    res.json({
      code: 1000,
      data: {
        userName: username,
        userSecret: secret,
      },
      message: "Vinculacion exitosa",
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    res.send(true);
  } catch (error) {
    next(error);
  }
}

async function basicAuth(req, res, next) {
  try {
    const { grant_type, username, password, refreshToken } = req.body;
    let user;
    if (grant_type == "SECRET") {
      if (!username || !password) {
        throw new AppError("No Credentials provided");
      }
      user = await User.findOne({ username: username });
      if (!user) {
        throw new AppError("Login failed | User Not Found");
      }
      if (user.secret !== password) {
        throw new AppError("Login failed | Secret doesn't match");
      }
      const token = jwt.sign({ userId: user.userId, username }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      const refresh = jwt.sign({ username }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '12d',
      });
      if (!token || !refresh) {
        throw new AppError("Login failed | Error while signing in");
      }
      res.status(201).json({
        access_token: token,
        refresh_token: refresh,
        secret: user.secret,
        userId: user.userId,
        username: user.username,
        // expiresIn: 7200000,
      });
    } else if (grant_type === "REFRESH") {
      const { username } = jwt.decode(refreshToken);
      let user;
      if (!username) {
        throw new AppError("Login failed | Invalid TOken");
      }
      user = await User.findOne({ username: username });
      if (!user) {
        throw new AppError("Login failed | User Not Found");
      }
      const { userId } = user;
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
        secret: user.secret,
        userId: userId,
        username: username,
        // expiresIn: 7200000,
      });
    } else {
      throw AppError("Invalid AUTH Request")
    }

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
