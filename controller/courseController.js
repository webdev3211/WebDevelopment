const mongoose = require("mongoose");
const Course = require("../model/courses");
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Validation
const validateCourseInput = require("../validation/admin/course");

/* 
    @routes 
        1. courses : to view all course
        2. addCourse : to add new Course
        3. deleteCourse : to delete an event it take id of the institute as a parameter
        4. updateCourse : to update an event it take id of the institute as a parameter
*/

router.get("/courses", async (req, res) => {
  pageNumber = req.query.pageno;
  console.log(pageNumber);
  pageSize = 10;
  findCourses = await Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  // console.log(findCourses.length);
  if (findCourses.length == 0) {
    res.status(200).json({
      msg: "No courses",
      success: false
    });
  } else {
    res.send(findCourses);
  }
});

router.get('/course/:courseId', (req, res) => {

  courseId = req.params.courseId;

  Course.findById({ _id: courseId }, (err, course) => {

    if (err) {
      return res.status(400).json({
        'msg': 'No course with this courseId'
      })
    } else {
      return res.status(200).json(course);
    }

  });



})

router.post("/addCourse", async (req, res) => {
  const { errors, isValid } = validateCourseInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  var course = new Course({
    name: req.body.name,
    // category: req.body.category,
    duration: req.body.duration,
    startDate: req.body.startDate,
    duration: req.body.duration,
    endDate: req.body.endDate,
    desc: req.body.desc,
    fee: req.body.fee,
    venue: req.body.venue,
    regLastDate: req.body.regLastDate
    // file: req.body.file
  });

  course
    .save()
    .then(course => {
      return res.status(200).json({
        msg: "Course uploaded",
        success: true
      });
    })
    .catch(err => {
      return res.status(400).json(errors);
    });
});

router.put("/updateCourse/:id", async (req, res) => {
  id = req.params.id;
  var course = await Course.findById(id);

  course.name = req.body.name || course.name;
  // course.category = req.body.category || course.category;
  course.startDate = req.body.startDate || course.startDate;
  course.endDate = req.body.endDate || course.endDate;
  course.desc = req.body.desc || course.desc;
  course.fee = req.body.fee || course.fee;
  course.venue = req.body.venue || course.venue;
  course.regLastDate = req.body.regLastDate || course.regLastDate;

  course.save((err, docs) => {
    if (!err) {
      res.status(200).send({ message: "Course updated Successfully " });
    } else {
      res.status(400).send({ message: "Course cannot be updated " });
    }
  });
});

router.delete("/deleteCourse/:id", async (req, res) => {
  id = req.params.id;
  console.log(id);

  Course.findOneAndRemove({ _id: id }, (err, docs) => {
    if (!err) {
      // let courses = Courses.find({})
      return res.status(200).send({ message: "Course Deleted Successfully " });
    } else {
      return res.status(400).send({ message: "Course cannot be Deleted ", data: err });
    }
  });
  // res.send(result);



});

module.exports = router;
