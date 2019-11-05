const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const User = require("../../models/User"); // user model

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/register", (req, res) => {
  res.send("hello");
});

// api/users/register
// POST route for registration

router.post("/register", urlencodedParser, (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// api/users/login
// POST route for login

router.post("/login", urlencodedParser, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "USER NOT FOUND" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // payload
        const payload = { id: user.id, name: user.name, email: user.email };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: " Incorrect Password " });
      }
    });
  });
});

// api/users/current
// private access

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
