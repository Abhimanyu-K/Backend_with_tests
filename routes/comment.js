const express = require("express");
const { body } = require("express-validator");
const { postComment } = require("../controllers/comment");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post(
  "/:post_id",
  [body("comment").trim().isLength({ min: 3 })],
  isAuth,
  postComment
);

module.exports = router;
