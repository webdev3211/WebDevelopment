const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
<<<<<<< HEAD
  studentId: {
    type: String
  },
  courseId: {
    type: String
  },
  paymentId: { type: String },
  amount: { type: Number },
  dateofRegistration: {
    type: Date,
    default: Date.now
  }
=======
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
    paymentId: { type: String, unique: true },
    amount: { type: Number }

>>>>>>> b47f01e1af062e2b77f09c6987813d341db8182e
});

module.exports.regSchema = regSchema;
module.exports.RegistrationModel = mongoose.model("registrations", regSchema);
