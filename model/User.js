const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  institute: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'Student',
    required: true
  }
});

module.exports = User = mongoose.model("users", userSchema);
