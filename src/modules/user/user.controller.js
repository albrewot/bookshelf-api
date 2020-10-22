const express = require("express");
const router = express.Router();
//Store
const userStore = require("./user.store");
//Middlewares
const validateBody = require("../../middlewares/validateBody.middleware");
const { authGuard } = require("../../middlewares/auth.middleware");
//User Routes
router.post("/register", [validateBody], register);
router.put("/edit", [authGuard, validateBody], editUser);
router.patch("/edit/password", [authGuard, validateBody], changePassword);
// router.get("/:username", getUser);

async function register(req, res, next) {
  try {
    const user = await userStore.create(req.body);
    res.send({
      data: user,
      message: `User [${user.username}] registered successfully`,
    });
  } catch (error) {
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const user = await userStore.changePassword(req.userId, req.body);
    res.send({
      message: `Password for user [${user.email}] was changed successfully`,
    });
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    const user = await userStore.edit(req.userId, req.body);
    res.send({ user });
  } catch (error) {
    next(error);
  }
}

// async function getUser(req, res, next) {
//   try {
//     if (req.params.username) {
//       const user = await userStore.getUser(req.params.username);
//       if (user) {
//         res.send({
//           data: user,
//           message: `User [${user.username}] was retrieved successfully`,
//         });
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = router;
