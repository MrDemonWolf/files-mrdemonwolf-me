const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';

  if (Validator.isEmpty(data.oldPassword)) {
    codes.oldPassword = 'REQUIRED';
    errors.oldPassword = 'Old Password is required.';
  }

  if (!Validator.isLength(data.newPassword, { min: 8, max: 56 })) {
    codes.newPassword = 'NOT_LONG_ENOUGH';
    errors.newPassword =
      'New Password must be between 8 and 56 characters long';
  }

  if (Validator.isEmpty(data.newPassword)) {
    codes.newPassword = 'REQUIRED';
    errors.newPassword = 'New Password is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
