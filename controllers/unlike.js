const Post = require("../models/post");

exports.unlike = (req, res, next) => {
  const postId = req.params.post_id;
  const userId = req.userId;

  Post.findById(postId)
    .then((post) => {
      const isLiked = post.likes.has(userId);
      if (!isLiked) {
        res.status(400).json({ message: "Post is not liked" });
      } else {
        post.likes.delete(userId);
        post.save();
        res.status(201).json({ message: "Post unliked" });
      }
    })
    .catch((err) => {
      res.status(404).json({ error: err });
    });
};
