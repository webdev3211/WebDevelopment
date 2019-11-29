const mongoose = require("mongoose");
const CourseSchema = require("./courses").CourseSchema;
const classSchema = new mongoose.Schema({
  name: { type: String }
});

const InstituteSchema = new mongoose.Schema({
  name: { type: String },
  campusAmbassador: { type: String, default: null },
  image: { type: String },
  state: { type: String },
  city: { type: String },
  website: { type: String },
  class: { type: [classSchema] }
});

module.exports.InstituteSchema = InstituteSchema;
module.exports.InstituteModel = mongoose.model("Institute", InstituteSchema);
