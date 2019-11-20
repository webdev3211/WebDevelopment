const mongoose = require('mongoose');
const CourseSchema = require('./courses').CourseSchema;


//city state
const InstituteSchema = new mongoose.Schema({
    name: { type: String },
    campusAmbassador: { type: String },
    image: { type: String }
});


module.exports.InstituteSchema = InstituteSchema;
module.exports.InstituteModel = mongoose.model("Institute", InstituteSchema);
