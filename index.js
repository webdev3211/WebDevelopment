const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const port = process.env.port || 3000;

const mongoose = require('./db');
const userController = require('./controller/userController');
var app = express();
app.use(cors());
app.use(bodyparser.json());

app.use('/', userController);

app.listen(3000, () => { console.log("LISTENING AT PORT - 3000"); })