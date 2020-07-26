const express = require("express");

//controllers
const usersController = require("../../app/controllers/usersController");

//validators
const { runValidation } = require("../validators");
const usersValidator = require("../validators/usersValidator");

//middlewares
const {
  authenticateAdminUser,
} = require("../../app/middlewares/authenticateAdminUser");
const { isAdmin } = require("../../app/middlewares/isAdmin");
const { authenticateUser } = require("../../app/middlewares/authenticateUser");
const { checkLoginCount } = require("../../app/middlewares/checkLoginCount");
const { photo } = require("../../app/controllers/blogsController");

const router = express.Router();

//REGISTER
router.post(
  "/register",
  usersValidator.register,
  runValidation,
  usersController.register
);

//LOGIN
router.post(
  "/login",
  usersValidator.login,
  runValidation,
  usersController.login
);

//LOGOUT
router.delete("/logout", authenticateUser, usersController.logout);

//ACCOUNT DETAILS WITH LOGIN
router.get(
  "/account",
  authenticateUser,
  checkLoginCount,
  usersController.account
);

//ACCOUNT DETAILS FOR PUBLIC PROFILE
router.get("/:username", usersController.publicProfile);

router.put("/update", authenticateUser, usersController.update);
router.get("/photo/:username", usersController.photo);

//is admin
router.get("/isAdmin", isAdmin);

//test
router.get("/admin", authenticateAdminUser, (req, res) => {
  res.json({ message: "admin page" });
});

router.get("/secret", usersController.requireSignin, (req, res) => {
  res.json({
    message: "you have access to secret page",
  });
});

module.exports = router;
