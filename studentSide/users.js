const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const User = require("../model/User"); // user model

const Institute = require("../model/institute").InstituteModel;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Load Input Validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.get("/register", (req, res) => {
  res.send("hello");
});

// api/users/register
// POST route for registration

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        institute: req.body.institute,
        role: req.body.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const profileFields = {};
              profileFields.user = user.id;
              profileFields.handle = user.name;
              console.log(profileFields);
              profileFields.institute = req.body.institute;
              profileFields.institute = profileFields.institute.replace(
                / /g,
                "_"
              );
              profileFields.class = req.body.class;
              Profile(profileFields)
                .save()
                .then(profile => {
                  Institute.findOne({ name: req.body.institute }).then(ins => {
                    // console.log(typeof (ins));
                    // res.json(ins);

                    // console.log(ins);
                    ins.studentId.unshift(user.id);

                    ins
                      .save()
                      .then(res => {
                        return res.json(profile);
                      })
                      .catch(err => res.json(err));
                  });
                })
                .catch(err => res.json(err));
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// api/users/login
// POST route for login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
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
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
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
