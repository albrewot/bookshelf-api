const multer = require("multer");
const uuid = require("uuid").v4;
const path = require("path");

const pfpStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/pfp");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

const pfpUpload = multer({ storage: pfpStorage }).single("file");

module.exports = {
  pfpUpload,
};
