const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
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
    if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
      errors.email = 'Email is invaild.  Example (example@example.com)';
    }

    if (Validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/admin/users/new');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
