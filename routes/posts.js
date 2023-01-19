const express = require("express");
const { body } = require("express-validator");
const postController = require("../controllers/posts");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/:post_id", isAuth, postController.getPostById);

router.delete("/:post_id", isAuth, postController.deletePostById);

router.post(
  "/",
  [
    body("title").trim().isLength({ min: 3 }),
    body("description").trim().isLength({ min: 3 }),
  ],
  isAuth,
  postController.createPost
);

module.exports = router;
