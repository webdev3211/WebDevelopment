const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    name: { type: String }
});


module.exports.ClassSchema = ClassSchema;
module.exports.ClassModel = mongoose.model(ClassSchema);