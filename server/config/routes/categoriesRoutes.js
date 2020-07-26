const express = require("express");

//controllers
const categoriesController = require("../../app/controllers/categoriesController");

//validators
const { runValidation } = require("../validators");
const categoriesValidator = require("../validators/categoriesValidator");

//middlewares
const {
  authenticateAdminUser,
} = require("../../app/middlewares/authenticateAdminUser");
const { authenticateUser } = require("../../app/middlewares/authenticateUser");
const { checkLoginCount } = require("../../app/middlewares/checkLoginCount");

const router = express.Router();

router.post(
  "/category",
  authenticateAdminUser,
  checkLoginCount,
  categoriesValidator.categoryCreate,
  runValidation,
  categoriesController.create
);

router.get("/categories", categoriesController.list);
router.get("/category/:slug", categoriesController.read);
router.get("/category-blog/:slug", categoriesController.readAssociatedBlogs);
router.delete(
  "/category/:slug",
  authenticateAdminUser,
  checkLoginCount,
  categoriesController.remove
);

module.exports = router;
