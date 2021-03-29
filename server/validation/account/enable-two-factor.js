const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.code = !isEmpty(data.code) ? data.code : '';

  if (Validator.isEmpty(data.code)) {
    codes.code = 'REQUIRED';
    errors.code = 'Code is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
