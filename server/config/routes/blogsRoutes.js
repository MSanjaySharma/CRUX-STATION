const express = require("express");

//controllers
const blogsController = require("../../app/controllers/blogsController");

//validators

//middlewares
const { authenticateUser } = require("../../app/middlewares/authenticateUser");
const { authorization } = require("../../app/middlewares/authorization");

const router = express.Router();

router.post("/blog", authenticateUser, blogsController.create);
router.get("/blogs", blogsController.list);
router.post(
  "/blogs-categories-tags",
  blogsController.listAllBlogsCategoriesTags
);
router.get("/blog/:slug", blogsController.read);
router.delete(
  "/blog/:slug",
  authenticateUser,
  authorization,
  blogsController.remove
);
router.put(
  "/blog/:slug",
  authenticateUser,
  authorization,
  blogsController.update
);

router.get("/blog/photo/:slug", blogsController.photo);
router.post("/blogs/related", blogsController.listRelated);
router.get("/blogs/search", blogsController.searchBlogs);

module.exports = router;
