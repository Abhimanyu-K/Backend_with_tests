const express = require("express");
const { getUser } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isAuth, getUser);

module.exports = router;
