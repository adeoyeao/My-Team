const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");

const router = express.Router();

router.use(express.static(path.join(__dirname, "../public")));
router.use(bodyparser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/contact.html"));
});

router.post("/contact-us", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const company = req.body.company;
  const title = req.body.title;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const msg = {
    from: `"MyTeam Contact Form" <ithaca.deployment@gmail.com>`,
    to: "ithaca.deployment@gmail.com",
    subject: "New message from contact form at MyTeam",
    text: `${name}: ${title} ${company} ${email}, has sent the following message:
            ${message}.`,
  };

  const info = transporter.sendMail(msg, (error, response) => {
    if (error) {
      res.sendFile(path.join(__dirname, "/../public/contact-failure.html"));
    } else {
      res.sendFile(path.join(__dirname, "/../public/contact-success.html"));
    }
  });
});

module.exports = router;
