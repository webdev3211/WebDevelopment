const mysqlCon = require('../db');
const functions = require('./functions');
const promise = require('promise');


const jwt = require('jsonwebtoken');
const express = require('express')
const Router = express.Router();
const _ = require('lodash');
const jwtHelper = require('../jwtHelper');




function error(e) {
    console.log(JSON.stringify(e, undefined, 2));
}





Router.post('/register', async(req, res) => {



    var u = await functions.bcryptjs(req.body);
    user = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: u.password,
        saltSecret: u.saltSecret,
    }


    userId = await functions.userRegister(user);
    if (!userId.errno) {
        res.status(200).send({ message: "Successfully Signed Up" });
    } else if (userId.errno == 1062) {
        res.status(402).send({ message: "Email already Registered" });
    } else {
        res.status(500).send();
    }

});

Router.post('/login', (req, res, next) => {
    _user.findOne({ email: req.body.email }, (err, doc) => {
        if (!doc) {
            //// if doc is not found ie. No results with the specific email
            res.status(400).send("Email not registered");
        } else if (!bcrypt.compareSync(req.body.password, doc.password)) {
            //if password is incorrect
            res.status(400).send("Incorrect Password");
        } else {


            ////instead of making Different function for jwtgenToken i wrote it here only

            token = jwt.sign({ userId: doc._id },
                "secret12345", { expiresIn: '1h' });


            res.status(200).json({ token: token });

        }
    })
});

Router.get('/userProfile', jwtHelper.verifyToken, (req, res, next) => {

    _user.findOne({ _id: req._id },
        (err, userR) => {
            if (!userR)
                return res.status(400).send("error login");
            else
                return res.status(200).json({ status: true, user: _.pick(userR, ['name', 'email']) })
        })
})
module.exports = Router;