const express = require("express"); // Import Express.js framework
require("dotenv").config(); // Load environment variables from a .env file
const userRouter = express.Router(); // Create an Express router instance
const UserModel = require("../models/User.Model"); // Import User Model

const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

// Route for user registration
userRouter.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      // If a user with the same email already exists
      res
        .status(200)
        .send({ msg: "User already registered on this email, Login now!!" });
    } else {
      // If the email is not already registered
      bcrypt.hash(password, 6, async function (err, hash) {
        const user = new UserModel({ ...req.body, password: hash });
        await user.save(); // Save the user with the hashed password
        res.status(200).send({ msg: "Registration Successful, Login Now!!" });
      });
    }
  } catch (error) {
    console.log("Unable to register the new user");
    res.status(400).send({ err: error.message });
  }
});

// Route for user login
userRouter.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      // If the user with the provided email exists
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          // If the provided password matches the stored hashed password
          res
            .status(200)
            .send({ msg: "Login Successful", name: user.name, status: true });
        } else {
          // If the provided password is incorrect
          res.status(200).send({ msg: "Wrong Password!!", status: false });
        }
      });
    } else {
      // If the email doesn't exist in the database
      res.status(200).send({ msg: "Email doesn't exist, Signup First!!" });
    }
  } catch (error) {
    console.log("Unable to login the user");
    res.status(400).send({ err: error.message });
  }
});

module.exports = userRouter; // Export the user router for use in other parts of the application
