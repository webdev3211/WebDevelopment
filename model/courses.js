const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    duration: {
        type: String
    },
    startdate: {
        type: Date,
        default: Date.now
    },
    enddate: {
        type: Date,
        default: Date.now
    },
    venue: { type: String },
    regLastDate: { type: Date },
    fee: { type: Number },
    desc: { type: String },
    file: { type: String }

});
const CourseModel = mongoose.model('course', CourseSchema);

module.exports = CourseModel;