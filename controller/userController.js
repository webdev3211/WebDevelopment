const express = require('express')
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admins');
const keys = require("../config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const _ = require('lodash');
// const jwtHelper = require('../jwtHelper');
// Load Input Validation
const validateadminRegisterInput = require("../validation/admin/register");
const validateadminLoginInput = require("../validation/admin/login");

/*
@routes
    register: to register admin . name email password phoneNo 
    login  to login
    adminProfile : returns the profile requires jwt token in header
*/


router.post('/register', (req, res) => {
    const { errors, isValid } = validateadminRegisterInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Admin.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email = "Email already exists";
            return res.status(400).json(errors);
        } else {
            const newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNo: req.body.phoneNo,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    newAdmin
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


router.post('/login', (req, res, next) => {
    Admin.findOne({ email: req.body.email }, (err, doc) => {
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


// api/admin/login
// POST route for admin login
// router.post("/login", (req, res) => {
//     const { errors, isValid } = validateadminLoginInput(req.body);

//     // Check Validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     const email = req.body.email;
//     const password = req.body.password;

//     // Find user by email
//     Admin.findOne({ email }).then(user => {
//         // Check for user
//         if (!user) {
//             errors.email = "User not found";
//             return res.status(404).json(errors);
//         }

//         // Check Password
//         // console.log(password, user.password);

//         bcrypt.compare(password, user.password).then(isMatch => {
//             if (isMatch) {
//                 // User Matched
//                 const payload = { id: user.id, name: user.name }; // Create JWT Payload

//                 // Sign Token
//                 jwt.sign(
//                     payload,
//                     keys.secretOrKey,
//                     { expiresIn: 3600 },
//                     (err, token) => {
//                         res.json({
//                             success: true,
//                             token: "Bearer " + token
//                         });
//                     }
//                 );
//             } else {
//                 errors.password = "Password incorrect";
//                 return res.status(400).json(errors);
//             }
//         });
//     });
// });



// router.get('/adminProfile', jwtHelper.verifyToken, (req, res, next) => {

//     Admin.findOne({ _id: req._id },
//         (err, adminR) => {
//             if (!adminR)
//                 return res.status(400).send("error login");
//             else
//                 return res.status(200).json({ status: true, admin: _.pick(adminR, ['name', 'email']) })
//         })
// })


module.exports = router;