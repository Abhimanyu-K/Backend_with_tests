const User = require("../models/user");

exports.getUser = (req, res, next) => {
  const userId = req.userId;
  User.findById(userId)
    .then((result) => {
      const { name, followers, following } = result;
      const numberOfFollowers = followers.size;
      const numberOfFollowing = following.size;
      res.status(200).json({ name, numberOfFollowers, numberOfFollowing });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      next(err);
    });
};
