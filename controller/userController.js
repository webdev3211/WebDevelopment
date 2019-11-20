const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _user = require('../model/userModel');
const express = require('express')
const Router = express.Router();
const _ = require('lodash');
const jwtHelper = require('../jwtHelper');

Router.post('/register', (req, res) => {
    var user = new _user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo
    })

    user.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else
        if (err.code === 11000)
            res.status(422).send("duplicate Email Id Found");

    });
});

Router.post('/login', (req, res, next) => {
    _user.findOne({ email: req.body.email }, (err, doc) => {
        if (!doc) {
            res.status(400).send("Email not registered");
        } else if (!bcrypt.compareSync(req.body.password, doc.password)) {
            res.status(400).send("Incorrect Password");
        } else {
            token = jwt.sign({ userId: doc._id },
                "secret12345", { expiresIn: '1h' }
            );
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