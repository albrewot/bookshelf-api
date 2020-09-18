const express = require("express");
const router = express.Router();
const bookStore = require("./book.store");

router.post("/create", create);

async function create(req, res, next){
    try{
        if(!req.body){
            throw {
                type: 'not exist',
                message: 'body doesnt exists'
            }
        }

      const book = await bookStore.create(req.body);

      res.send({
        type: "SUCCESS",
        data: book,
        message: `Book [${book.title}] was created or updated successfully`,
      });

    }catch(error){
        next(error);
    }
}

module.exports = router;
