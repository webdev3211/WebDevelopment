const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateInstituteInpute(data) {
  let errors = {};

  data.studentId = !isEmpty(data.studentId) ? data.studentId : "";
  data.courseId = !isEmpty(data.courseId) ? data.courseId : "";
  data.paymentId = !isEmpty(data.paymentId) ? data.paymentId : "";
  data.amoount = !isEmpty(data.amount) ? data.amoount : "";
  data.institute = !isEmpty(data.institute) ? data.institute : "";

  if (Validator.isEmpty(data.studentId)) {
    errors.studentId = " Student ID is required";
  }
  if (Validator.isEmpty(data.courseId)) {
    errors.courseId = "Course ID is required";
  }
  //   if (Validator.isEmpty(data.paymentId)) {
  //     errors.paymentId = "payment ID is required";
  //   }
  if (Validator.isEmpty(data.amount)) {
    errors.amount = "amount is required";
  }
  if (Validator.isEmpty(data.institute)) {
    errors.institute = "institute is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
