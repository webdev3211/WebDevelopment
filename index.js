const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const mongoose = require('./db');

const userController = require('./controller/userController');
const courseController = require('./controller/courseController');
const instituteController = require('./controller/instituteController');
var app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/', userController);
app.use('/', courseController);
app.use('/', instituteController);

app.listen(3000, () => { console.log("LISTENING AT PORT - 3000"); })