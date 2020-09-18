const express = require("express");
const router = express.Router();
//Store
const userStore = require("./user.store");
const { ref } = require("@hapi/joi");

//User Routes
router.post("/register", register);
router.get("/:username", getUser);

async function register(req, res, next) {
  try {
    const response = await userStore.create(req.body);
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
