const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Profile = require("../model/Profile");
const Institute = require("../model/institute").InstituteModel;

router.get("/", (req, res) => {
  res.json("Hello from admin");
});

// admin making a user campus ambassador
// when user is made ambassador, the campusAmbassador field of his institute is also filled.
router.put("/users/profile/campusAmbassador/:id", (req, res) => {
  const id = req.params.id;
  Profile.findByIdAndUpdate({ _id: id }, { isCampusAmbassador: true })
    .then(async user => {
      const ins = user.institute;
      // Institute.find({ name: ins }, { campusAmbassador: id })
      //   .then(user => {
      //     res.json(user);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      const doc = await Institute.findOne({ name: ins });

      // Sets `name` and unsets all other properties
      doc.overwrite({ campusAmbassador: id });
      await doc.save();
      res.json(doc);
    })
    .catch(err => res.json(err));
  Institute.findByIdAndUpdate({ name: ins }, { campusAmbID: req.params.id })
    .then(user => console.log(user))
    .catch(err => {
      console.log(err);
    });
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
