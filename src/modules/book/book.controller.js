const express = require("express");
const router = express.Router();
const bookStore = require("./book.store");

router.post("/create", create);
router.get("/find", find)

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

async function find(req, res, next){

  try {
    const books = await bookStore.find(req.query);
    
    res.send({
      data: books
    })

  } catch (error) {
    next(error);
  }

}

module.exports = router;
