const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
  try {
    let { email, password } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    if (Validator.isEmpty(password)) {
      errors.password = 'Password is required.';
    }
    if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
      errors.email = 'Email is invaild.  Example (example@example.com)';
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/login');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
