const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "course",
    required: true
  },
  dateofRegistration: {
    type: Date,
    default: Date.now
  },
  // paymentId: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  amount: {
    type: Number,
    required: true
  },
  institute: { type: String, required: true }
});

module.exports.regSchema = regSchema;
module.exports.RegistrationModel = mongoose.model("registrations", regSchema);
