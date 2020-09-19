const express = require("express");
const router = express.Router();
const validateUser = require("../../validations/user");
//Store
const userStore = require("./user.store");

//User Routes
router.post("/register", register);
router.get("/:username", getUser);

async function register(req, res, next) {
  try {
    const validBody = validateUser("register", req.body);
    if (validBody && validBody.error) {
      throw { message: validBody.error.join(" ,") };
    }
    const response = await userStore.create(validBody);
    res.send({ message: response });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    if (req.params.username) {
      const response = await userStore.getUser(req.params.username);
      if (response) {
        res.send({
          type: "SUCCESS",
          data: response,
          message: `User [${response.username}] was retrieved successfully`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
