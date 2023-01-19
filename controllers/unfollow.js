const User = require("../models/user");

exports.unfollow = (req, res, next) => {
  const unfollowUserId = req.params.unfollow_id;
  const userId = req.userId;

  console.log(unfollowUserId);

  User.findById(userId)
    .then((user) => {
      const isFollowed = user.following.has(unfollowUserId);
      if (!isFollowed) {
        const error = new Error("Could not find the User");
        error.statusCode = 404;
        throw error;
      } else {
        user.following.delete(unfollowUserId);
        user.save();
        res.status(201).json({ message: "User Unfollowed" });
      }
    })
    .catch((err) => res.status(404).json({ error: err }));
};
