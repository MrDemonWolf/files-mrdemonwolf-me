const Validator = require('validator');
const isEmpty = require('./isEmpty');

/**
 * Load MongoDB models.
 */
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
    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/user/resend-activation');
    }

    const user = await User.find({
      $or: [{ email }, { emailVerified: { $ne: false } }]
    });

    if (user.length === 0) {
      req.flash(
        'error',
        'There is no account with that email or the account is already activated '
      );
      return res.redirect('/user/resend-activation');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
