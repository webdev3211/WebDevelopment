const express = require("express");
const bodyparser = require("body-parser");
const fileupload = require("express-fileupload");
const cors = require("cors");
var app = express();
app.use(cors());


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(fileupload());

const mongoose = require("./db");

const userController = require("./controller/userController");
const courseController = require("./controller/courseController");
const instituteController = require("./controller/instituteController");
const eventController = require("./controller/eventController");
const registrationsController = require("./controller/registrationsController");
const materialController = require('./controller/materialController');
const studentController = require("./controller/studentController");

const profile = require("./studentSide/profile");
const users = require("./studentSide/users");
const courses = require("./studentSide/courseEnroll");
const institute = require("./studentSide/institute");

app.post("/testfile", (req, res) => {
  console.log(req.files);

})
const passport = require("passport");

app.use(passport.initialize()); // passport middleware

require("./config/passport")(passport);

app.get('/', (req, res) => {
  res.json({
    msg: 'Login'
  })
  console.log('Step up analytics web ');
})

app.use("/admin", userController);
app.use("/admin", registrationsController);
app.use("/admin", courseController);
app.use("/admin", instituteController);
app.use("/admin", eventController);
app.use("/admin", studentController);
app.use("/admin", materialController);
app.use("/profile", profile);
app.use("/users", users);
app.use("/course", courses);
app.use("/institute", institute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
