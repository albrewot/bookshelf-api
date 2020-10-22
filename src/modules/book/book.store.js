const { bookRegisterValidator, bookFindValidator } = require("../../validations");
const Book = require("../../models/Book");
const GoogleBook = require('./api/googleBook');
const AppError = require('../../errors/AppError');

// TODO: REFACTOR TO ALL!!!!! WARNING

class BookStore {

  create = async (body) => {
    try {
      const userId = "5f6401dc1114466d493ac7d3";
      const validBody = bookRegisterValidator(body);

      if (validBody && validBody.error) {
        throw new AppError(validBody.error, 400);
      }

      const isbnBook = await Book.findOne({
        isbn_10: body.isbn_10,
        isbn_13: body.isbn_13,
      });

      if (isbnBook) {
        // TODO: get id user from token and validate

        if (!isbnBook.current_owners.includes(userId)) {
          isbnBook.current_owners.push(userId);
          isbnBook.save();
        }

        return isbnBook;
      }
      validBody.current_owners = [userId];
      const newBook = new Book(validBody);
      const book = Book.create(newBook);

      if (!book) {
        throw new AppError("Unexpected DB Error", 403);
      }

      return book;

    } catch (error) {
      throw error;
    }
  };

  find = async (body) => {

    try {

      const validBody = bookFindValidator(body);

      if (validBody && validBody.error) {
        throw new AppError(validBody.error, 400);
      }

      let books = await Book.find({
        ...body
      });

      if(0 === books.length){
        
        let googleBook = new GoogleBook();

        return await googleBook.findBooks(body);
      }

      return books;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BookStore();
