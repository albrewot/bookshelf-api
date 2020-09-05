const express = require("express");
const router = express.Router();
//Services
const testService = require("../services/test.service");

//End-Points
router.get("/function", testFunction);

module.exports = router;

async function testFunction(req, res, next) {
  try {
    const response = await testService.testMethod();
    if (response) {
      res.json({ message: "[TEST][GET REQUEST] Success", data: response });
    }
  } catch (error) {
    console.log(err);
  }
}
