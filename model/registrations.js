const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
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
});

module.exports.regSchema = regSchema;
module.exports.RegistrationModel = mongoose.model("registrations", regSchema);
