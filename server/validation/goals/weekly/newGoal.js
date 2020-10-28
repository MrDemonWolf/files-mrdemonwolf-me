const Validator = require('validator');
const isEmpty = require('../../../utils/is-empty');

module.exports = data => {
  const errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Goal is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
