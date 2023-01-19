const jwt = require("jsonwebtoken");
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = require("../models/user");
const Post = require("../models/post");

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [
  {
    _id: userOneId,
    name: "userOne",
    email: "user1@test.com",
    password: "12345678910",
    followers: new Map(),
    following: new Map(),
    tokens: [
      {
        token: jwt
          .sign(
            {
              email: email,
              userId: _id.toString(),
            },
            "secretstringforReunion"
          )
          .toString(),
      },
    ],
  },
  {
    _id: userTwoId,
    name: "userTwo",
    email: "user2@test.com",
    password: "12345678911",
    followers: new Map(),
    following: new Map(),
    tokens: [
      {
        token: jwt
          .sign(
            {
              email: email,
              userId: _id.toString(),
            },
            "secretstringforReunion"
          )
          .toString(),
      },
    ],
  },
];
