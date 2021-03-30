const Validator = require('validator');
const isEmpty = require('./isEmpty');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    let { email } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    email = !isEmpty(email) ? email : '';

    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
      errors.email = 'Email is invaild.  Example (example@example.com)';
    }
    // Check if there is a user with that email..
    if (isEmpty(errors.email)) {
      const userEmail = await User.findOne({ email });
      if (!userEmail) {
        errors.email = 'There is no account with that email.';
      }
    }
    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/user/forgot-password');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
