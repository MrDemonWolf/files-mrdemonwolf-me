/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../utils/is-empty');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 56 })) {
    errors.password = 'Password must be between 8 and 56 characters long';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
