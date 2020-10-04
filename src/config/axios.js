const { default: Axios } = require("axios");

const instance = Axios.create({
    baseURL: process.env.GOOGLE_BOOK_URI,
    params: {
        token: process.env.GOOGLE_BOOK_API_KEY
    }
});

module.exports = instance;