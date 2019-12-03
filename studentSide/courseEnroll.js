const router = require("express").Router();
const User = require("../model/User");
const Profile = require("../model/Profile");
const Institute = require("../model/institute").InstituteModel;
const Course = require("../model/courses");
const Registrations = require("../model/registrations").RegistrationModel;
const mongoose = require("mongoose");
const passport = require("passport");

// user enrolling to course
// first the course would be filled with student id
router.put(
  "/enroll/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id })
      .then(course => {
        if (course.studentId.contains(req.user.id)) {
          res.send("enrolled");
        } else {
          course.studentId.unshift(req.user.id);
          course.save().then(course => console.log(course));
          // after that the profile of that student would be filled with that course id
          Profile.findOne({ user: req.user.id })
            .then(profile => {
              profile.courses.unshift(course.id);
              profile.save().then(profile => console.log(profile));

              // after that the registration model would be filled with the course id and student id
              registration = new Registrations({
                studentId: req.user.id,
                courseId: req.params.id,
                paymentId: "paymentID",
                amount: course.fee,
                institute: profile.institute
              });
              registration
                .save()
                .then(reg => res.json(reg))
                .catch(err => res.json(err));
            })
            .catch(err => console.log(err));
          // }
        }
      })
      .catch(err => res.json(err));
  }
);

// getting course by student id
router.get("/:studentId", (req, res) => {
  studentId = req.params.studentId;

  Course.find({ studentId: studentId }, (err, course) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(course);
    }
  });
});

//getting course which are enrolled
router.get(
  "/enroll/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id }).then(course => {
      if (course.studentId.contains(req.user.id)) {
        res.send("enrolled");
      }
    });
  }
);
module.exports = router;

Array.prototype.contains = function(needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
};
