const Validator = require('validator');
const { authenticator } = require('otplib');
const User = require('../models/User');
const isEmpty = require('./../validation/isEmpty');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    let { mfa } = req.body;
    mfa = !isEmpty(mfa) ? mfa : '';

    const user = await User.findOne({ email });

    if (!user) {
      return next();
    }

    if (user.mfa) {
      if (Validator.isEmpty(mfa)) {
        req.flash('error', { mfa: 'MFA is required.' });
        return res.redirect('/login');
      }

      const isValid = authenticator.check(mfa, user.mfaSecret);

      if (!isValid) {
        req.flash('error', { mfa: 'Invaild MFA Code' });
        res.redirect('/login');
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
