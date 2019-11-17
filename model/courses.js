const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
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
    desc: { type: String },
    file: { type: String }

});
const CourseModel = mongoose.model('course', CourseSchema);

module.exports = CourseModel;