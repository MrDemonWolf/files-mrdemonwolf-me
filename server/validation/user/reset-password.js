const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.comfirmPassword = !isEmpty(data.comfirmPassword)
    ? data.comfirmPassword
    : '';

  if (!Validator.isLength(data.password, { min: 8, max: 56 })) {
    errors.password = 'Password must be between 8 and 56 characters long';
  }

  if (data.password !== data.comfirmPassword) {
    errors.password = 'Both passwords must match.';
    errors.comfirmPassword = 'Both passwords must match.';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  if (Validator.isEmpty(data.comfirmPassword)) {
    errors.comfirmPassword = 'You must comfirm your new password.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
