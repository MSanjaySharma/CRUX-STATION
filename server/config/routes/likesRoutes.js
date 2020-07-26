const express = require("express");
const { authenticateUser } = require("../../app/middlewares/authenticateUser");
const likesController = require("../../app/controllers/likesController");

const router = express.Router();

router.get("/likeUnlike/:blogId", authenticateUser, likesController.likeUnlike);

module.exports = router;
