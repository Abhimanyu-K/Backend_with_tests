const express = require("express");
const { getAllPosts } = require("../controllers/posts");
const isAuth = require("../middleware/isAuth");
const Post = require("../models/post");

const router = express.Router();

router.get("/", isAuth, getAllPosts);

module.exports = router;
