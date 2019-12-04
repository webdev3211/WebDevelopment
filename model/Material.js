const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course',
        required:true
    } ,
    materialFile : {
        type: [String],
        unique: true
    }
});

module.exports = mongoose.model('material', MaterialSchema);