const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    codes.email = 'INVALID';
    errors.email = 'Email is invalid.';
  }

  if (Validator.isEmpty(data.email)) {
    codes.email = 'REQUIRED';
    errors.email = 'Email is required.';
  }

  if (Validator.isEmpty(data.password)) {
    codes.password = 'REQUIRED';
    errors.username = 'Username is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
