//Environtment config
require("dotenv").config();
//Libraries
const express = require("express");
const path = require("path");
// const dir = path.join(__dirname, " public");
global.rootPath = path.resolve(__dirname);
const cors = require("cors");

//Routes Import
const routes = require("./src/routes");

//Middlewares
const app = express();
const errorHandler = require("./src/middlewares/error.middleware");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
routes(app, express);

//Error Handling Middleware
app.use(errorHandler);

//Server Init
app.listen(process.env.PORT, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
