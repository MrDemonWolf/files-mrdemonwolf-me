const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
  try {
    let {
      username,
      email,
      oldPassword,
      newPassword,
      comfirmPassword,
      streamerMode
    } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    username = !isEmpty(username) ? username : '';
    email = !isEmpty(email) ? email : '';
    oldPassword = !isEmpty(oldPassword) ? oldPassword : '';
    newPassword = !isEmpty(newPassword) ? newPassword : '';
    comfirmPassword = !isEmpty(email) ? comfirmPassword : '';
    streamerMode = !isEmpty(email) ? streamerMode : '';

    if (Validator.isEmpty(username)) {
      errors.email = 'Username is required.';
    }
    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    if (Validator.isEmpty(email)) {
      errors.email = 'Email is required.';
    }
    if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
      errors.email = 'Email is invaild.  Example (example@example.com)';
    }
    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/account');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
