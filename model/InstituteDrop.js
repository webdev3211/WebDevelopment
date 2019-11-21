const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema

const InstituteDropSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  campusAmbID: {
    type: String
  }
});

module.exports = InstituteDrop = mongoose.model(
  "instituteDrop",
  InstituteDropSchema
);
