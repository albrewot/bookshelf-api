const express = require("express");
const router = express.Router();
//Store
const userStore = require("./user.store");

//User Routes
router.post("/register", register);

async function register(req, res, next) {
  try {
    if (req.body) {
      const response = await userStore.create(req.body);
      if (response) {
        res.send({
          type: "SUCCESS",
          message: `User [${req.body.username}] was created successfully`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
