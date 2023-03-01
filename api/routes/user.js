const express = require("express");
const UsersModel = require("../models/users_model");
const userRouter = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  try {
    // Get user input <>
    const { first_name, last_name, email, password } = req.body;

    // Validate user input<>
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist<>
    // Validate if user exist in our database<>
    UsersModel.findByEmail(email, (err, data) => {
      if (err) {
      } else return res.status(409).send("User Already Exist. Please Login");
    });

    //Encrypt user password <>
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database <>
    const usersModel = new UsersModel({
      first_name: first_name,
      last_name: last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    UsersModel.create(usersModel, (err, data) => {
      if (err)
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user.",
        });
      else {
        // Create token<>
        const token = jwt.sign({ user_id: data.id, email }, "SECURITY", {
          expiresIn: "30d",
        });

        UsersModel.updateTokenById(data.id, token, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.status(201).json(token);
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    // Get user input<>
    const { email, password } = req.body;

    // Validate user input<>
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    UsersModel.findByEmail(email, async (err, mData) => {
      if (err) {
        return res.status(409).send("User Not Exist.");
      } else {
        if (await bcrypt.compare(password, mData.password)) {
          // Create token<>
          const token = jwt.sign({ user_id: mData.id, email }, "SECURITY", {
            expiresIn: "30d",
          });
          UsersModel.updateTokenById(mData.id, token, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const datatosend = {
                id: mData.id,
                first_name: mData.first_name,
                last_name: mData.last_name,
                email: mData.email,
                token: token,
              };
              res.status(201).json(datatosend);
            }
          });
        } else {
          res.status(400).send("Invalid Credentials");
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
