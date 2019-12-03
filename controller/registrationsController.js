const mongoose = require("mongoose");
const Registrations = require("../model/registrations").RegistrationModel;
const router = require("express").Router();
const passport = require("passport");

//validation
const validateRegistrationInput = require("../validation/admin/registration");

/*
 @routes 
        1. registrations : all the registrations send pageno query . eg: http://localhost:3000/registrations?:pageno=1

        2. registrationsbydate: filtering registrations by date send pagenumber query and dateBegin (format yyyy-mm-dd) and dateEnd (format yyyy-mm-dd) as query ::: example : http://localhost:3000/registrationsbydate?pageno=1&dateBegin=2019-11-19
        3.registrationsbycourse : filtering registrations by courses send pagenumber query and courseId as query
        4. registrationInstitiute
*/

router.get("/registrations", async (req, res) => {
  pageno = req.query.pageno;
  pagesize = 10;
  registrations = await Registrations.
    find().populate('users')
    .skip(pagesize * (pageno - 1))
    .limit(pagesize);
  res.send(registrations);
});

router.get("/registrationsbydate", async (req, res) => {
  pageno = req.query.pageno;
  pagesize = 15;
  dateBegin = new Date(String(req.query.dateBegin));
  dateEnd = new Date(req.query.dateEnd || Date.now());

  registrations = await Registrations.find({
    dateofRegistration: { $gte: dateBegin, $lte: dateEnd }
  })
    .skip(pagesize * (pageno - 1))
    .limit(pagesize);
  res.send(registrations);
});

router.get("/registrationsbycourse", async (req, res) => {
  pageNo = req.query.pageno;
  pagesize = 15;
  reqcourseId = req.query.courseId;
  registrations = await Registrations.find({ courseId: reqcourseId })
    .skip(pagesize * (pageNo - 1))
    .limit(pagesize);
});

router.post("/addRegistrations", (req, res) => {
  const { errors, isValid } = validateRegistrationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  registrations = new Registrations({
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    paymentId: req.body.paymentId,
    amount: req.body.amount,
    institute: req.body.institute
  });

  registrations.save((err, docs) => {
    if (!err) {
      res.status(200).send({ message: "registration successful" });
    } else {
      res.status(400).send({ message: "Registrations not successfull" });
    }
  });
});

module.exports = router;
