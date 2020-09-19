const express = require("express");
const router = express.Router();
const bookStore = require("./book.store");

router.post("/create", create);

async function create(req, res, next) {
  try {
    const book = await bookStore.create(req.body);
    res.send({
      data: book,
      message: `Book [${book.title}] was created or updated successfully`,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = router;
