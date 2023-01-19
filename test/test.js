// Endpoint testing with mocha and chai and chai-http

// Import libraries
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
var mongoose = require("mongoose");

// Import server
var server = require("../app");

// Import Todo Model
var Post = require("../models/post");
var User = require("../models/user");

// use chaiHttp for making the actual HTTP requests
chai.use(chaiHttp);

describe("Posts API", function () {
  // it("Should register user, login user, check token, create post and delete a post", function (done) {
  //   chai
  //     .request(server)

  //     // register user
  //     .post("/api/authenticate/signup")

  //     //send user registration details
  //     .send({
  //       name: "8th Test User",
  //       email: "testing8@user8.com",
  //       password: "testcases8",
  //     })
  //     .end((err, res) => {
  //       // response from user signup should have status code of 201
  //       res.should.have.status(201);
  //     });
  // });

  it("login and create post", (done) => {
    // Login once and get token to access all the protected routes
    chai
      .request(server)
      .post("/api/authenticate")
      //send user login details
      .send({
        email: "testing8@user8.com",
        password: "testcases8",
      })
      .end((err, res) => {
        console.log("Running the login part");
        res.body.should.have.property("token");
        let token = res.body.token;

        // Positive result
        chai
          .request(server)
          .post("/api/posts")
          .set("Authorization", token)
          .send({
            title: "Test Post1",
            description: "Test Description1",
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("post");
          });

        // Negative result
        chai
          .request(server)
          .post("/api/posts")
          .set("Authorization", token)
          .send({
            description: "Test Description1",
          })
          .end((err, res) => {
            res.should.have.status(500);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            done();
          });
      });
  });

  // it("Should Login user and create post", function (done) {
  //   // Follow up with login
  // });

  // it("Create Post", function () {
  //   // Follow up with requesting get All posts which is a protected route
  //   console.log("ctpost");
  // });
});
