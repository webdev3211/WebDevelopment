const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Profile = require("../model/Profile");
const Institute = require("../model/institute").InstituteModel;
const passport = require("passport");

router.get("/", (req, res) => {
  res.json("Hello from admin");
});

// admin making a user campus ambassador
// when user is made ambassador, the campusAmbassador field of his institute is also filled.
// admin access only
router.put("/users/profile/campusAmbassador/:id", (req, res) => {
  const id = req.params.id;
  Profile.findOne({ _id: id })
    .then(user => {
      const ins = user.institute;
      Profile.findOneAndUpdate({ _id: user._id }, { isCampusAmbassador: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
      Institute.findOne({ name: ins }).then(inst => {
        console.log(id);
        Institute.findOneAndUpdate({ _id: inst._id }, { campusAmbassador: id })
          .then(user => console.log(user))
          .catch(err => console.log(err));
      });
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
router.get(
  "/users/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    Profile.find({ _id: id })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
  }
);

//admin deleting user
router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        res.json(err);
      });
  }
);
module.exports = router;
