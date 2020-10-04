const axios = require("../../../config/axios");
const { getQueryParams } = require('../../../helpers/book.helper');
const AppError = require('../../../errors/AppError');

class googleBook{

    findBooks = async (body) =>
    {
        const queryParams = getQueryParams(body);
        const response = await axios.get(`volumes?q=${queryParams}&startIndex=${body.offset}`);

        if(!response.data){
          throw new AppError("Libro no encontrado", 404);
        }

        return response.data;
    }
}

module.exports = googleBook;