const axios = require("../../../config/axios");
const { getQueryParams } = require('../../../helpers/book.helper');

class googleBook{

    findBooks = async (body) =>
    {

        let queryParams = getQueryParams(body);

        let response = await axios.get(`volumes?q=${queryParams}&startIndex=${body.offset}`);

        if(!response.data){
          throw new Error("Libro no encontrado");
        }

        return response.data;

    }
}

module.exports = googleBook;