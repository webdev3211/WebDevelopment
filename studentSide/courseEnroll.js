const router = require("express").Router();
const User = require("../model/User");
const Profile = require("../model/Profile");
const Institute = require("../model/institute").InstituteModel;
const Course = require("../model/courses");
const Registrations = require("../model/registrations").RegistrationModel;

// user enrolling to course
// first the course would be filled with student id
router.put("/enroll/:id", (req, res) => {
  Course.findOne({ _id: req.params.id })
    .then(course => {
      if (course.contains(req.body.id)) {
        console.log("already");
      }
      // course.studentId.unshift(req.body.id);
      // course.save().then(course => console.log(course));

      // after that the profile of that student would be filled with that course id
      // Profile.findOne({ _id: req.body.id })
      //   .then(profile => {
      //     profile.courses.unshift(course.id);
      //     console.log(profile);
      //     profile.save().then(profile => res.json(profile));

      // after that the registration model would be filled with the course id and student id
      // registration = new Registrations({
      //   studentId: req.user.id,
      //   courseId: req.params.id,
      //   paymentId: "",
      //   amount: course.fee,
      //   institute: profile.institute
      // });
      // registration
      //   .save()
      //   .then(reg => res.json(reg))
      //   .catch(err => res.json(err));
      // })
      // .catch(err => console.log(err));
    })
    .catch(err => res.json(err));
});
module.exports = router;

Array.prototype.contains = function(needle) {
  for (i in this) {
    if (this[i] == needle) return true;
  }
  return false;
};
