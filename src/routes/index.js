const router = require("express").Router();
const AppError = require("../errors/AppError");
//Controllers
const authController = require("../modules/authentication/auth.controller");
const userController = require("../modules/user/user.controller");
const bookController = require("../modules/book/book.controller");

module.exports = (app, express) => {
  app.get("/", (req, res, next) => {
    res.send({ message: "Root Route" });
  });

  //Rutas
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/book", bookController);

  //Not found
  app.use(router);
  app.use((req, res, next) => {
    next(new AppError(`ROUTE [${req.originalUrl}] NOT FOUND`, 404));
  });
};
