const express = require("express");
const loginHandler = require("../controllers/auth");

const router = express.Router();

router.post("/", loginHandler.login);

router.post("/signup", loginHandler.signup);

module.exports = router;
