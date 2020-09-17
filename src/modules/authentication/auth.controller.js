const express = require("express");
const router = express.Router();
//Services
const authStore = require("./auth.store");

//End-Points
router.get("/function", authFunction);

module.exports = router;

async function authFunction(req, res, next) {
  try {
    const response = await authStore.testMethod();
    if (response) {
      res.json({ message: "[TEST][GET REQUEST] Success", data: response });
    }
  } catch (error) {
    console.log(err);
  }
}
