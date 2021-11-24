var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

router.post("/auth/login", (req, res) => {
  userModel.findOne({ email: req.body.email }).exec((err, user) => {
    console.log("SignIn works");

    if (err) {
      return res.send(err);
    } else {
      if (user) {
        if (user.authenticate(req.body.password)) {
          const { firstName, lastName, email, role } = user;

          const token = jwt.sign(
            { _id: user._id, email: user.email },
            "JWT_SECRET",
            { expiresIn: "1d" }
          );
          res.status(200).json({
            token,
            user: {
              firstName,
              lastName,
              email,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      } else {
        return res.status(201).json({
          message: "User doesnt exist. Please SignUp",
        });
      }
    }
  });
});

router.post("/auth/register", (req, res) => {
  console.log("At sign up");
  userModel.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.send(err);
    } else {
      if (user) {
        console.log("User exists");
        return res.status(201).json({
          message: "User Already Exist",
        });
      } else {
        const { firstName, lastName, email, password, dob, city, pin } =
          req.body;
        console.log(firstName, lastName, password, email);

        const _user = new userModel({
          firstName,
          lastName,
          email,
          password,
          dob,
          city,
          pin,
        });
        console.log("Got data", _user);

        _user.save((error, data) => {
          if (error) {
            console.log("I couldnt save user due to: " + error);
            return res.status(400).json({
              message: error,
            });
          }
          if (data) {
            const token = jwt.sign(
              { _id: data._id, email: data.email },
              "JWT_SECRET",
              { expiresIn: "1d" }
            );
            return res.status(201).json({
              token: token,
              user: data,
            });
          }
        });
      }
    }
  });
});

router.get("/getUsers", (req, res) => {
  userModel.find().exec((err, data) => {
    res.json({ data });
  });
});
module.exports = router;
