const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

mongoose.connection
  .once("open", () => {
    console.log(
      `MongoDB connection has been made | DB : [${process.env.MONGO_DB_NAME}]`
    );
  })
  .on("error", (error) => {
    console.log(
      `MongoDB connection error | DB : [${process.env.MONGO_DB_NAME}] | Error : ${error}`
    );
  })
  .on("disconnected", () => {
    console.log(
      `MongoDB connection ended | DB : [${process.env.MONGO_DB_NAME}]`
    );
  });

module.exports = mongoose;
