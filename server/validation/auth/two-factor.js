const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.token = !isEmpty(data.token) ? data.token : '';
  data.code = !isEmpty(data.code) ? data.code : '';

  if (Validator.isEmpty(data.token)) {
    codes.token = 'REQUIRED';
    errors.token = 'Token is required';
  }

  if (Validator.isEmpty(data.code)) {
    codes.code = 'REQUIRED';
    errors.token = 'Code is required';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
