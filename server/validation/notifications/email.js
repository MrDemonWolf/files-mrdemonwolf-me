const Validator = require('validator');
const isEmpty = require('../../utils/is-empty');

module.exports = data => {
  const codes = {};
  const errors = {};

  data.weeklyGoals = !isEmpty(data.weeklyGoals)
    ? data.weeklyGoals.toString()
    : '';

  if (!Validator.isBoolean(data.weeklyGoals)) {
    codes.weeklyGoals = 'BOOLEAN';
    errors.weeklyGoals = 'Weekly Goals must be a boolean';
  }

  if (Validator.isEmpty(data.weeklyGoals)) {
    codes.weeklyGoals = 'REQUIRED';
    errors.weeklyGoals = 'Weekly Goals is required.';
  }

  return {
    codes,
    errors,
    isValid: isEmpty(errors)
  };
};
