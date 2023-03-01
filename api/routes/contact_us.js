const express = require("express");
const ContactUsModel = require("../models/contact_us_model");
const contactRouter = express.Router();
const transporter = require("../../mailer");

// create
contactRouter.post("/", (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Tutorial
  const contactModel = new ContactUsModel({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  var mailOptions = {
    from: "gamerid0431@gmail.com",
    to: req.body.email,
    subject: "Welcome",
    text: "welcome to ----------",
  };

  ContactUsModel.create(contactModel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the device.",
      });
    else {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send(data);
    }
  });
});

// Retrieve all
contactRouter.get("/", (req, res) => {
  const title = req.query.title;

  ContactUsModel.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving deviceid.",
      });
    else res.send(data);
  });
});

module.exports = contactRouter;
