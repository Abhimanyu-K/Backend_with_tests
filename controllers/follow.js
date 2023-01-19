const User = require("../models/user");

exports.follow = (req, res, next) => {
  const followUserId = req.params.follow_id;
  const userId = req.userId;

  console.log(followUserId);

  User.findById(userId)
    .then((user) => {
      user.following.set(followUserId, 1);
      user.save();
      res.status(201).json({ message: "User Followed" });
    })
    .catch((err) => {
      res.status(500).json({ err });
      next(err);
    });
};
