var nodemailer = require("nodemailer");
// const SMTPConnection = require("nodemailer/lib/smtp-connection");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gamerid0431@gmail.com",
    pass: "Prashik@123",
  },
});

module.exports = transporter;
