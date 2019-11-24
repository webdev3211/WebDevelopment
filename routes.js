const Router = require('express').Router();
const register = require('./controller/userController');

Router.post('/register',register);

module.exports = Router;