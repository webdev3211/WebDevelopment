const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateInstituteInpute(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  // data.class = !isEmpty(data.class) ? data.class : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }
  if (Validator.isEmpty(data.state)) {
    errors.state = "state field is required";
  }
  if (Validator.isEmpty(data.city)) {
    errors.city = "city field is required";
  }
  if (!Validator.isURL(data.website)) {
    errors.website = "website is not valid";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
