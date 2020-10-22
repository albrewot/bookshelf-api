//Environtment config
require("dotenv").config();
//Libraries
const express = require("express");
const cors = require("cors");

//Routes Import
const routes = require("./src/routes");

//Middlewares
const app = express();
const errorHandler = require("./src/middlewares/error.middleware");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
routes(app, express);

//Error Handling Middleware
app.use(errorHandler);

//Server Init
app.listen(process.env.PORT, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
