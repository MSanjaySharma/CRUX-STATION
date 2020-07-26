const express = require("express");

//controllers
const tagsController = require("../../app/controllers/tagsController");

//validators
const { runValidation } = require("../validators");
const tagsValidator = require("../validators/tagsValidator");

//middlewares
const {
  authenticateAdminUser,
} = require("../../app/middlewares/authenticateAdminUser");
const { authenticateUser } = require("../../app/middlewares/authenticateUser");
const { checkLoginCount } = require("../../app/middlewares/checkLoginCount");

const router = express.Router();

router.post(
  "/tag",
  authenticateAdminUser,
  checkLoginCount,
  tagsValidator.tagCreate,
  runValidation,
  tagsController.create
);

router.get("/tags", tagsController.list);
router.get("/tag/:slug", tagsController.read);
router.get("/tag-blog/:slug", tagsController.readAssociatedBlogs);
router.delete(
  "/tag/:slug",
  authenticateAdminUser,
  checkLoginCount,
  tagsController.remove
);

module.exports = router;
