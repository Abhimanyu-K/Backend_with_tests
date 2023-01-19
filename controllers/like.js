const Post = require("../models/post");

exports.like = (req, res, next) => {
  const postId = req.params.post_id;
  const userId = req.userId;

  Post.findById(postId)
    .then((post) => {
      const isLiked = post.likes.get(userId);
      if (isLiked) {
        res.status(300).json({ message: "Post is already liked by user" });
      }
      post.likes.set(userId, true);
      post.save();
      res.status(201).json({ message: "Post liked" });
    })
    .catch((err) => {
      res.status(404).json({ error: "Post Not found" });
      next(err);
    });
};
