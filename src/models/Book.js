const mongoose = require("../config/db");
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "missing title"],
  },
  subtitle: {
    type: String,
    required: [true, "missing subtitle"],
  },
  publisher: {
    type: String,
    required: [true, "missing publisher"],
  },
  description: {
    type: String,
    default: null,
  },
  published_date: {
    type: Date,
    default: null,
  },
  page_count: {
    type: Number,
    default: null,
  },
  isbn_10: {
    type: String,
    required: [true, "missing isbn_10"],
  },
  isbn_13: {
    type: String,
    required: [true, "missing isbn_13"],
  },
  cover_image: {
    type: String,
    default: null,
  },
  categories: {
    type: String,
    default: null,
  },
  authors: {
    type: String,
    required: [true, "missing authors"],
  },
  language: {
    type: String,
    required: [true, "missing language"],
  },
  current_owners: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

BookSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Book", BookSchema);
