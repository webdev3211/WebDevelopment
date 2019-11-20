const mongoose = require('mongoose');

const regSchema = new mongoose.Schema({
    studentId: {
        type: String
    },
    courseId: {
        type: String
    },
    dateofRegistration: {
        type: Date,
        default: Date.now
    },
    paymentId: { type: String },
    amount: { type: Number }

});

module.exports.regSchema = regSchema;
module.exports.RegistrationModel = mongoose.model('registrations', regSchema);