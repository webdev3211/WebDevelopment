const mongoose = require('mongoose');
const InstituteSchema = require('./institute').InstituteSchema;

const EventSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    desc: {
        type: String
    },
    photo: {
        type: String
    },
    institute: {
        type: [InstituteSchema]
    }

});

module.exports.EventSchema = EventSchema
module.exports.EventModel = mongoose.model('event', EventSchema);;