const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db');

const userController = require('./controller/userController');
const courseController = require('./controller/courseController');
const instituteController = require('./controller/instituteController');
const eventController = require('./controller/eventController');
const registrationsController = require('./controller/registrationsController');
var app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/', userController);
app.use('/', registrationsController);
app.use('/', courseController);
app.use('/', instituteController);
app.use('/', eventController);

app.listen(3000, () => { console.log("LISTENING AT PORT  3000"); });