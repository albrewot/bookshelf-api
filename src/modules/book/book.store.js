const db = require("../../config/db");
const validate = require('../../validations/book');
const { Book } = db;

// TODO: REFACTOR TO ALL!!!!! WARNING

class BookStore {
  
  create = async (body) => {

    try{
        const valid = validate('register', body);

        if(valid && valid.error){
            throw valid.error;
        }

        const isbnBook = await Book.findOne({isbn_10: body.isbn_10, isbn_13: body.isbn_13});
        
        if(isbnBook){
            // TODO: get id user from token and validate
            const userId = "5f6401dc1114466d493ac7d3";
            
            if(!isbnBook.current_owners.includes(userId)){
                isbnBook.current_owners.push(userId);
                isbnBook.save();
            }

            return isbnBook;
        }

        const book = new Book(valid);
        const newBook = Book.create(book);

        if(!newBook){
            throw {
                type: 'FAILURE',
                message: 'Unexpected error in db'
            }
        }

        return newBook;
        

    }catch(error){
        throw(error);
    }

  }
}

module.exports = new BookStore();
