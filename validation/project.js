const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {

    let errors = {};


    data.title = !isEmpty(data.title) ? data.title : '';
    data.url = !isEmpty(data.url) ? data.url : '';
    // data.fromDate = !isEmpty(data.fromDate) ? data.fromDate : '';

    data.desc = !isEmpty(data.desc) ? data.desc : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if (Validator.isEmpty(data.url)) {
        errors.url = 'Url field is required';
    }


    // if (Validator.isEmpty(data.fromDate)) {
    //     errors.fromDate = 'From date field is required';
    // }


    if (Validator.isEmpty(data.desc)) {
        errors.desc = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}