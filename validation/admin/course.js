const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateCourseInput(data) {
    let errors = {};


    data.name = !isEmpty(data.name) ? data.name : '';
    data.duration = !isEmpty(data.duration) ? data.duration : '';
    data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
    data.duration = !isEmpty(data.duration) ? data.duration : '';
    data.endDate = !isEmpty(data.endDate) ? data.endDate : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';
    data.fee = !isEmpty(data.fee) ? data.fee : '';
    data.venue = !isEmpty(data.venue) ? data.venue : '';
    data.regLastDate = !isEmpty(data.regLastDate) ? data.regLastDate : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    if (Validator.isEmpty(data.duration)) {
        errors.duration = 'duration field is required';
    }

    if (Validator.isEmpty(data.startDate)) {
        errors.startDate = 'startDate field is required';
    }

    if (Validator.isEmpty(data.endDate)) {
        errors.endDate = 'endDate field is required';
    }

    if (Validator.isEmpty(data.fee)) {
        errors.fee = 'fee field is required';
    }

    if (Validator.isEmpty(data.venue)) {
        errors.venue = 'venue field is required';
    }

    if (Validator.isEmpty(data.desc)) {
        errors.desc = 'desc field is required';
    }

    if (Validator.isEmpty(data.regLastDate)) {
        errors.regLastDate = 'regLastDate field is required';
    }





    return {
        errors,
        isValid: isEmpty(errors)
    };
};
