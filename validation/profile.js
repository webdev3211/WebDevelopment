const Validator = require('validator');
const isEmpty = require('./is-empty');


module.exports = function validateProfileInput(data) {

    let errors = {};


    data.handle = !isEmpty(data.handle) ? data.handle : '';



    data.facebook = !isEmpty(data.facebook) ? data.facebook : '';
    data.youtube = !isEmpty(data.youtube) ? data.youtube : '';
    data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : '';
    data.twitter = !isEmpty(data.twitter) ? data.twitter : '';
    data.instagram = !isEmpty(data.instagram) ? data.instagram : '';


    data.phoneNo = !isEmpty(data.phoneNo) ? data.phoneNo : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.currentCity = !isEmpty(data.currentCity) ? data.currentCity : '';
    data.homeCity = !isEmpty(data.homeCity) ? data.homeCity : '';
    data.bio = !isEmpty(data.bio) ? data.bio : '';


    if (Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = 'User phoneNo field is required';
    }

    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'dob field is required';
    }


    if (Validator.isEmpty(data.currentCity)) {
        errors.currentCity = 'Current City field is required';
    }


    if (Validator.isEmpty(data.homeCity)) {
        errors.homeCity = 'Home City field is required';
    }


    if (Validator.isEmpty(data.bio)) {
        errors.bio = 'homeCity field is required';
    }


    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }



    if (!Validator.isEmpty(data.youtube)) {

        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a Valid URL';
        }

    }

    if (!Validator.isEmpty(data.linkedin)) {

        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a Valid URL';
        }

    }


    if (!Validator.isEmpty(data.facebook)) {

        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a Valid URL';
        }

    }


    if (!Validator.isEmpty(data.instagram)) {

        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a Valid URL';
        }

    }

    if (!Validator.isEmpty(data.twitter)) {

        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a Valid URL';
        }

    }







    return {
        errors,
        isValid: isEmpty(errors)
    }

}