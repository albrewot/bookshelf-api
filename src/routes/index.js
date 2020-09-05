//Controllers
const testController = require("../controllers/test.controller");

module.exports = (app, express) => {
  app.get("/", (req, res, next) => {
    console.log("[ROOT] Success");
    res.send({ message: "Root Route" });
  });

  //Rutas
  app.use("/api/test", testController);

  //Router
  app.use(express.Router());

  //Not found
  app.use((req, res) => {
    res
      .status(404)
      .send({ message: `ERROR 404 | Route [${req.url}] NOT FOUND` });
  });
};
