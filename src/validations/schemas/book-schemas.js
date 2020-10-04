const Joi = require("joi");

const BookRegisterSchema = Joi.object().keys({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  publisher: Joi.string().required(),
  description: Joi.string().required(),
  published_date: Joi.date(),
  page_count: Joi.number().required(),
  isbn_10: Joi.string().min(10).max(10).required(),
  isbn_13: Joi.string().min(13).max(13).required(),
  //cover_image: Joi.string(),
  categories: Joi.string(),
  authors: Joi.string().required(),
  language: Joi.string().required(),
  //current_owners: Joi.array().items(Joi.string().required()),
});

const BookFindSchema = Joi.object()
.keys({
  title: Joi.string(),
  publisher: Joi.string(),
  isbn_10: Joi.string().min(10).max(10),
  isbn_13: Joi.string().min(13).max(13),
  categories: Joi.string(),
  authors: Joi.string(),
  language: Joi.string(),
  offset: Joi.string().required(),
})
.or('title', 'isbn_10', 'isbn_13', 'publisher', 'authors');

module.exports = {
  BookRegisterSchema,
  BookFindSchema
};
