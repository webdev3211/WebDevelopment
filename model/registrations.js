const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const regSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  courseId: {
    type: String
  },
  dateofRegistration: {
    type: Date,
    default: Date.now
  },
  paymentId: { type: String },
  amount: { type: Number },
  institute: { type: String }
});

module.exports.regSchema = regSchema;
module.exports.RegistrationModel = mongoose.model("registrations", regSchema);
