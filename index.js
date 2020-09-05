//Environtment config
require("dotenv").config();
//Libraries
const express = require("express");
const cors = require("cors");

//Routes Import
const routes = require("./src/routes");

//Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
routes(app, express);

//Server Init
app.listen(process.env.PORT, () => {
  console.log(`Server listening on PORT: ${process.env.PORT}`);
});
