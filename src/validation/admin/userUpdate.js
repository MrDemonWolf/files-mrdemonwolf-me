const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
  try {
    let { username, email, newPassword } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    username = !isEmpty(username) ? username : '';
    email = !isEmpty(email) ? email : '';
    newPassword = !isEmpty(newPassword) ? newPassword : '';

    if (Validator.isEmpty(username)) {
      errors.username = 'Username is required.';
    }
    if (!req.user.streamerMode) {
      if (Validator.isEmpty(email)) {
        errors.email = 'Email is required.';
      }
      if (!Validator.isEmpty(email) && !Validator.isEmail(email)) {
        errors.email = 'Email is invaild.  Example (example@example.com)';
      }
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect(`/admin/users/edit/${req.params.slug}`);
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
