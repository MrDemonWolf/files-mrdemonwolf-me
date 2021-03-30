const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';

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

  if (Validator.isEmpty(data.username)) {
    codes.username = 'REQUIRED';
    errors.username = 'Username is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
