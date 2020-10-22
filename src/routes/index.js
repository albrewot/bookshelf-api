//Controllers
const authController = require("../modules/authentication/auth.controller");
const userController = require("../modules/user/user.controller");
const bookController = require("../modules/book/book.controller");
const AppError = require("../errors/AppError");

module.exports = (app, express) => {
  app.get("/", (req, res, next) => {
    console.log("[ROOT] Success");
    res.send({ message: "Root Route" });
  });

  //Rutas
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/book", bookController);

  //Not found
  app.all("*", (req, res, next) => {
    next(new AppError(`ROUTE [${req.originalUrl}] NOT FOUND`, 404));
  });
};
