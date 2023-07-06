const express = require("express");
const router = express.Router();
const { MulterError } = require("multer");
//Store
const userStore = require("./user.store");
//Middlewares
const validateBody = require("../../middlewares/validateBody.middleware");
const { authGuard } = require("../../middlewares/auth.middleware");
const { pfpUpload } = require("../../config/multer");
//User Routes
router.get("/get", [authGuard], getUser);
router.post("/register", [validateBody], register);
router.put("/edit", [authGuard, validateBody], editUser);
router.put("/edit/pfp", [authGuard], editProfilePicture);
router.patch("/edit/password", [authGuard, validateBody], changePassword);
// router.get("/:username", getUser);

async function register(req, res, next) {
  try {
    const user = await userStore.create(req.body);
    res.send({
      data: user,
      message: `User [${user.email}] registered successfully`,
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
    res.send({ user, message: `User [${user.email}] was edited successfully` });
  } catch (error) {
    next(error);
  }
}

async function editProfilePicture(req, res, next) {
  try {
    pfpUpload(req, res, async (err) => {
      if (err instanceof MulterError) {
        next(err);
      } else if (err) {
        next(err);
      }
      const user = await userStore.edit(
        req.userId,
        {
          profile_picture: `${process.env.URL}/images/pfp/${req.file.filename}`,
        },
        req.file.filename
      );
      return res.send({
        image: user.profile_picture,
        message: `Profile picture of user [${user.email}] was updated successfully`,
      });
    });
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userStore.getUser(req.username);
    if (user) {
      res.send({
        user: user,
        message: `User [${user.email}] was retrieved successfully`,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = router;
