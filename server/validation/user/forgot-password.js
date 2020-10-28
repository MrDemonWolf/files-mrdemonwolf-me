const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
