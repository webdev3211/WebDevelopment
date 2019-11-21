const express = require("express");
const router = express.Router();
const User = require("../model/User");
// const validateRegisterInput = require("../../validation/register");
const Institute = require("../model/InstituteDrop");
// const bcrypt = require("bcryptjs");
const Profile = require("../model/Profile");

router.get("/", (req, res) => {
  res.json("Hello from admin");
});

// admin adding Institute dropdown

router.post("/registers/institute", (req, res) => {
  const newInstitute = new Institute({
    name: req.body.name,
    campusAmbID: req.body.Id || ""
  });
  newInstitute
    .save()
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

// admin making a user campus ambassador

router.put("/users/profile/campusAmbassador/:id", (req, res) => {
  const id = req.params.id;
  Profile.findByIdAndUpdate({ _id: id }, { isCampusAmbassador: true })
    .then(user => {
      res.json(user);
    })
    .catch(err => res.json(err));
});

// admin getting all the users
router.get("/users", (req, res) => {
  pageno = req.query.pageno;
  pagesize = 3;
  User.find({})
    .skip(pagesize * (pageno - 1))
    .limit(pagesize)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

//admin getting user's profile

router.get("/users/profile/:id", (req, res) => {
  const id = req.params.id;
  Profile.find({ _id: id })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});

//admin deleting user

router.delete("/users/:id", (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
