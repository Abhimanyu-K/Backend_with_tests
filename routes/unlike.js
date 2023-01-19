const express = require("express");
const { unlike } = require("../controllers/unlike");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/:post_id", isAuth, unlike);

module.exports = router;
