const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong credentials!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        process.env.JWTSECRETKEY,
        { expiresIn: "23h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        userName: loadedUser.name,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

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
      next(err);
    });
};
