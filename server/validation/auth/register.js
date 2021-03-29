const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (
    !Validator.isWhitelisted(
      data.username,
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    )
  ) {
    codes.username = 'INVALID_CHARACTERS';
    errors.username =
      'Username is invalid. Must only contain numbers or letters.';
  }

  if (!Validator.isLength(data.username, { min: 3, max: 28 })) {
    codes.username = 'NOT_LONG_ENOUGH';
    errors.username = 'Username must be between 3 and 28 characters long.';
  }

  if (!Validator.isLength(data.password, { min: 8, max: 56 })) {
    codes.password = 'NOT_LONG_ENOUGH';
    errors.password = 'Password must be between 8 and 56 characters long.';
  }
  if (!Validator.isEmail(data.email)) {
    codes.email = 'INVALID';
    errors.email = 'Email is invalid.';
  }

  if (Validator.isEmpty(data.username)) {
    codes.username = 'REQUIRED';
    errors.username = 'Username is required.';
  }

  if (Validator.isEmpty(data.email)) {
    codes.email = 'REQUIRED';
    errors.email = 'Email is required.';
  }

  if (Validator.isEmpty(data.password)) {
    codes.password = 'REQUIRED';
    errors.password = 'Password is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
