const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    codes.email = 'INVALID';
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(data.email)) {
    codes.email = 'REQUIRED';
    errors.email = 'Email is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
