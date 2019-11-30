const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const fileupload = require("express-fileupload");

const mongoose = require("./db");

const userController = require("./controller/userController");
const courseController = require("./controller/courseController");
const instituteController = require("./controller/instituteController");
const eventController = require("./controller/eventController");
const registrationsController = require("./controller/registrationsController");
const studentController = require("./controller/studentController");

const profile = require("./studentSide/profile");
const users = require("./studentSide/users");
const courses = require("./studentSide/courseEnroll");
const institute = require("./studentSide/institute");


const passport = require("passport");

var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(passport.initialize()); // passport middleware

require("./config/passport")(passport);
app.use(fileupload());

app.use("/admin", userController);
app.use("/admin", registrationsController);
app.use("/admin", courseController);
app.use("/admin", instituteController);
app.use("/admin", eventController);
app.use("/admin", studentController);
app.use("/profile", profile);
app.use("/users", users);
app.use("/course", courses);
app.use("/institute", institute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
