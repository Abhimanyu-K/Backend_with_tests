const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const date = new Date().toISOString();
  const userId = req.userId;
  const post = new Post({
    title,
    description,
    date,
    userId,
  });

  post
    .save()
    .then((result) => {
      const { _id, title, description, createdAt } = result;

      const post = {
        postId: _id,
        title,
        desc: description,
        created_at: createdAt,
      };
      res.status(201).json({
        message: "Post Created",
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((results) => {
      const posts = results.map((post) => {
        const { _id, title, description, createdAt, likes, comments } = post;
        const numberOfLikes = likes.size || 0;
        return {
          postId: _id,
          title,
          desc: description,
          created_at: createdAt,
          comments,
          likes: numberOfLikes,
        };
      });
      res.status(200).json({ posts });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.post_id;
  Post.findById(postId).then((result) => {
    const { title, description, likes, comments } = result;
    const numberOfLikes = likes.size;
    const numberOfComments = comments.length;
    const post = {
      title,
      description,
      numberOfLikes,
      numberOfComments,
    };
    res.status(200).json({ post });
  });
};

exports.deletePostById = (req, res, next) => {
  const postId = req.params.post_id;

  Post.findById(postId)
    .then((post) => {
      console.log(post);
      if (post === null) {
        const error = new Error("Could bot find the Post");
        error.statusCode = 404;
        throw error;
      }
      console.log(postId);
      Post.findByIdAndDelete(postId);
    })
    .then((result) => {
      res.status(200).json({ message: "Post deleted", posts: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ error: err });
    });
};
