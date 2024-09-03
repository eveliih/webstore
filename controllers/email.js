const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const EMAIL = process.env.EMAIL;
const EPASSWORD = process.env.EPASSWORD;

const emailRouter = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EPASSWORD,
  },
});

emailRouter.post("/send", async (req, res) => {
  const { email, subject, text } = req.body;

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: subject,
    html: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = emailRouter;
