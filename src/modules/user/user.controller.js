const express = require("express");
const router = express.Router();
//Store
const userStore = require("./user.store");
//Middlewares
const validateBody = require("../../middlewares/validateBody.middleware");
//User Routes
router.post("/register", [validateBody], register);
router.get("/:username", getUser);

async function register(req, res, next) {
  try {
    const user = await userStore.create(req.body);
    res.send({
      data: response,
      message: `User [${user.username}] registered successfully`,
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    if (req.params.username) {
      const user = await userStore.getUser(req.params.username);
      if (response) {
        res.send({
          data: user,
          message: `User [${response.username}] was retrieved successfully`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
