const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateExperienceInput(data) {

    let errors = {};


    data.title = !isEmpty(data.title) ? data.title : '';
    data.issuer = !isEmpty(data.issuer) ? data.issuer : '';
    data.url = !isEmpty(data.url) ? data.url : '';
    data.desc = !isEmpty(data.desc) ? data.desc : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Paper title field is required';
    }

    if (Validator.isEmpty(data.issuer)) {
        errors.issuer = 'issuer field is required';
    }


    if (Validator.isEmpty(data.url)) {
        errors.url = 'Url field is required';
    }


    if (Validator.isEmpty(data.desc)) {
        errors.desc = 'Description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}