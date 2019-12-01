const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const fileupload = require('express-fileupload');

var app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(fileupload());

const mongoose = require("./db");

const userController = require("./controller/adminController");
const courseController = require("./controller/courseController");
const instituteController = require("./controller/instituteController");
const eventController = require("./controller/eventController");
const registrationsController = require("./controller/registrationsController");
const studentController = require("./controller/studentController");
const profile = require("./studentSide/profile");
const users = require("./studentSide/users");
const courses = require("./studentSide/courseEnroll");

const passport = require("passport");

app.use(passport.initialize()); // passport middleware

require("./config/passport")(passport);
app.post('/', (req, res) => {
    imageFile = req.files.image;
    res.send(imageFile);
})

app.use("/", userController);
app.use("/", registrationsController);
app.use("/", courseController);
app.use("/", instituteController);
app.use("/", eventController);
app.use("/", studentController);
app.use("/", profile);
app.use("/users", users);
app.use("/course", courses);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening at ${port}`);
});