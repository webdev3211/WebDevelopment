const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {

    let errors = {};


    data.institution = !isEmpty(data.institution) ? data.institution : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fromDate = !isEmpty(data.fromDate) ? data.fromDate : '';
    data.toDate = !isEmpty(data.toDate) ? data.toDate : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';


    if (Validator.isEmpty(data.institution)) {
        errors.institution = 'institution name field is required';
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }



    if (Validator.isEmpty(data.fromDate)) {
        errors.fromDate = 'From date field is required';
    }


    if (Validator.isEmpty(data.toDate)) {
        errors.fromDate = 'To date field is required';
    }

    if (Validator.isEmpty(data.desc)) {
        errors.fromDate = 'Description field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}