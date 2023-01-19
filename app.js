const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

const LOC_HOME = "/";
const LOC_API = "/api";
const LOC_AUTH = LOC_API + "/authenticate";
const LOC_FOLLOW = LOC_API + "/follow";
const LOC_UNFOLLOW = LOC_API + "/unfollow";
const LOC_USER = LOC_API + "/user";
const LOC_POSTS = LOC_API + "/posts";
const LOC_LIKE = LOC_API + "/like";
const LOC_UNLIKE = LOC_API + "/unlike";
const LOC_COMMENT = LOC_API + "/comment";
const LOC_ALL_POSTS = LOC_API + "/all_posts";

function set_Routes() {
  const router_home = require("./routes/home");
  const router_auth = require("./routes/auth");
  const router_allposts = require("./routes/allposts");
  const router_comment = require("./routes/comment");
  const router_follow = require("./routes/follow");
  const router_unfollow = require("./routes/unfollow");
  const router_like = require("./routes/like");
  const router_posts = require("./routes/posts");
  const router_unlike = require("./routes/unlike");
  const router_user = require("./routes/user");
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(LOC_HOME, router_home);
  app.use(LOC_AUTH, router_auth);
  app.use(LOC_ALL_POSTS, router_allposts);
  app.use(LOC_POSTS, router_posts);
  app.use(LOC_COMMENT, router_comment);
  app.use(LOC_FOLLOW, router_follow);
  app.use(LOC_UNFOLLOW, router_unfollow);
  app.use(LOC_LIKE, router_like);
  app.use(LOC_UNLIKE, router_unlike);
  app.use(LOC_USER, router_user);
}

set_Routes();

const server = app.listen(PORT || 8080, function () {
  console.log(`Connected on port ${PORT}`);
});

(async function () {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((result) => {})
    .catch((err) => console.log("ERORR: ", err));
})();

module.exports = server;
