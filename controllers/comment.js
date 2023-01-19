const Post = require("../models/post");

exports.postComment = (req, res, next) => {
  const postid = req.params.post_id;
  const comment = req.body.comment;
  const userId = req.userId;
  Post.findById(postid)
    .then(async (result) => {
      const commentIndex = result.comments.push({ comment, userId });
      const post = await result.save();
      const commentId = post.comments[parseInt(commentIndex) - 1]._id;
      res.status(201).json({ message: "Commented Successfully", commentId });
    })
    .catch((err) => res.status(404).json({ error: "Not Commented" }));
};
