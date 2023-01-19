const express = require("express");
const { like } = require("../controllers/like");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/:post_id", isAuth, like);

module.exports = router;
