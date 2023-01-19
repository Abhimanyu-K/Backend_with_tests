const express = require("express");
const { follow } = require("../controllers/follow");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/:follow_id", isAuth, follow);

module.exports = router;
