/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('../utils/is-empty');

module.exports = data => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required.';
  }

  if (
    !Validator.isWhitelisted(
      data.username,
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    )
  ) {
    errors.username =
      'Username is invalid. Must only contain numbers or letters.';
  }

  if (!Validator.isLength(data.username, { min: 3, max: 28 })) {
    errors.username = 'Username must be between 3 and 28 characters long';
  }
  if (!Validator.isLength(data.password, { min: 8, max: 56 })) {
    errors.password = 'Password must be between 8 and 56 characters long';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
