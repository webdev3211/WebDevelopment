const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String
  },
  studentId: [{ type: String }],
  duration: {
    type: String
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  // category: {
  //   type: String
  // },
  endDate: {
    type: Date,
    default: Date.now
  },
  venue: { type: String },
  regLastDate: {
    type: Date,
    default: Date.now
  },
  fee: { type: Number },
  desc: { type: String },
  file: {
    type: String,
    default:
      "https://virudhunagar.nic.in/wp-content/themes/district-theme/images/uncategorized.jpg"
  }
});

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;
