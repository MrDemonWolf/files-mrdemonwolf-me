const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.comfirmPassword = !isEmpty(data.comfirmPassword)
    ? data.comfirmPassword
    : '';

  if (!Validator.isLength(data.password, { min: 8, max: 56 })) {
    codes.password = 'NOT_LONG_ENOUGH';
    errors.password = 'Password must be between 8 and 56 characters long';
  }

  if (data.password !== data.comfirmPassword) {
    codes.password = 'NO_MATCH';
    errors.password = 'Both passwords must match.';
    codes.comfirmPassword = 'NO_MATCH';
    errors.comfirmPassword = 'Both passwords must match.';
  }

  if (Validator.isEmpty(data.password)) {
    codes.password = 'REQUIRED';
    errors.password = 'Password is required.';
  }

  if (Validator.isEmpty(data.comfirmPassword)) {
    codes.comfirmPassword = 'MUST_CONFIRM';
    errors.comfirmPassword = 'You must comfirm your new password.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
