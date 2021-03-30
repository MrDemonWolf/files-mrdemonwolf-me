const Validator = require('validator');
const isEmpty = require('./isEmpty');

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    username = !isEmpty(username) ? username : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (Validator.isEmpty(username)) {
      errors.username = 'Username is required.';
    }

    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }

    if (Validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
      errors.email = 'Email is invalid.  Example (example@example.com)';
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/signup');
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    const user = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (user) {
      req.flash(
        'error',
        `This ${
          email === user.email
            ? 'email'
            : username === user.username
              ? 'username'
              : 'email and username'
        } has already been used.`
      );
      return res.redirect('/signup');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
