const express = require("express");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const router = express.Router();
const Institute = require("../model/institute").InstituteModel;

router.get("/register", (req, res) => {
  Institute.find({})
    .then(ins => res.json(ins))
    .catch(err => res.json(err));
});

module.exports = router;
