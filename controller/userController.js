const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _admin = require('../model/Admins');
const express = require('express')
const Router = express.Router();
const _ = require('lodash');
const jwtHelper = require('../jwtHelper');

/*
@routes
    register: to register admin . name email password phoneNo 
    login  to login
    adminProfile : returns the profile requires jwt token in header
*/


Router.post('/register', (req, res) => {
    var admin = new _admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo
    })

    admin.save((err, docs) => {
        if (!err) {
            res.send(docs);
        } else
        if (err.code === 11000)
            res.status(422).send("duplicate Email Id Found");

    });
});

Router.post('/login', (req, res, next) => {
    _admin.findOne({ email: req.body.email }, (err, doc) => {
        if (!doc) {
            res.status(400).send("Email not registered");
        } else if (!bcrypt.compareSync(req.body.password, doc.password)) {
            res.status(400).send("Incorrect Password");
        } else {
            token = jwt.sign({ adminId: doc._id },
                "thisisiiasidiasdiujasdxadnsdadisjnsiadiasjdiashdaHASHKEY", { expiresIn: '1h' }
            );
            res.status(200).json({ token: token });

        }
    })
});

Router.get('/adminProfile', jwtHelper.verifyToken, (req, res, next) => {

    _admin.findOne({ _id: req._id },
        (err, adminR) => {
            if (!adminR)
                return res.status(400).send("error login");
            else
                return res.status(200).json({ status: true, admin: _.pick(adminR, ['name', 'email']) })
        })
})
module.exports = Router;