const axios = require("../../../config/axios");

class googleBook{

    findBooks = async (body) =>
    {

        let queryParams = this._getQueryParams(body);

        let response = await axios.get(`volumes?q=${queryParams}&startIndex=${body.offset}`);

        if(!response.data){
          throw new Error("Libro no encontrado");
        }

        return response.data;

    }

    _getQueryParams(body) {

        let params = '';
        let selector = '';
    
        for (const key in body) {
    
          switch (key) {
    
            case 'title':
              selector = 'intitle:';
              break;
    
            case 'authors':
              selector = 'inauthor:';
              break;
    
            case 'isbn_10' || 'isbn_13':
              selector = 'isbn:';
              break;
    
            case 'categories':
              selector = 'subject:';
              break;
    
            case 'publisher':
              selector = 'inpublisher:';
              break;
    
            default:
              selector = '';
              break;
          }
    
          if(!selector) continue;
    
          params = params + '+' + selector + body[key];
    
        }
        return params;
      }
}

module.exports = googleBook;