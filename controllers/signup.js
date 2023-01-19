const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const date = new Date().toISOString();
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error("E-mail already Exist");
        error.statusCode = 501;
        throw error;
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedpass) => {
          const user = new User({
            email: email,
            password: hashedpass,
            name: name,
            date: date,
          });
          return user.save();
        })
        .then((result) => {
          res
            .status(201)
            .json({ message: "User Created!", userId: result._id });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
};
