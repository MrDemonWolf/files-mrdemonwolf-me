const Validator = require('validator');
const isEmpty = require('../../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    codes.title = 'REQUIRED';
    errors.title = 'Title is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
