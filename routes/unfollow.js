const express = require("express");
const { unfollow } = require("../controllers/unfollow");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/:unfollow_id", isAuth, unfollow);
module.exports = router;
