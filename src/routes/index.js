//Controllers
const authController = require("../modules/authentication/auth.controller");
const userController = require("../modules/user/user.controller");
const bookController = require("../modules/book/book.controller");


module.exports = (app, express) => {
  app.get("/", (req, res, next) => {
    console.log("[ROOT] Success");
    res.send({ message: "Root Route" });
  });

  //Rutas
  app.use("/auth", authController);
  app.use("/user", userController);
  app.use("/book", bookController);

  //Router
  app.use(express.Router());

  //Not found
  app.use((req, res) => {
    res
      .status(404)
      .send({ message: `ERROR 404 | Route [${req.url}] NOT FOUND` });
  });
};
