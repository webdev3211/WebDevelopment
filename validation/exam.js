const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {

    let errors = {};


    data.name = !isEmpty(data.name) ? data.name : '';
    data.score = !isEmpty(data.score) ? data.score : '';
    data.url = !isEmpty(data.url) ? data.url : '';


    if (Validator.isEmpty(data.name)) {
        errors.name = 'Exam name field is required';
    }

    if (Validator.isEmpty(data.score)) {
        errors.score = 'score field is required';
    }


    if (Validator.isEmpty(data.url)) {
        errors.url = 'Url field is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }

}