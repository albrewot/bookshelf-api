const googleBook = require("./googleBook");

class BookApiFactory{

    set type(type){
        this.type = type;
    }

    getBookType = () => {

        switch(this.type){
            case 'manual':
                break;
            case 'api':
                return new googleBook();
            default:
                throw new Error("especifica el tipo");
        }

    }
}

module.exports = new BookApiFactory();