const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/",
  [
    body("email").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 3 }),
  ],
  login
);

module.exports = router;
