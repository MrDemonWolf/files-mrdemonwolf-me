const moment = require('moment');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetTokenExpire: {
        $gt: moment()
      }
    });
    if (!user) {
      req.flash(
        'error',
        'Your password reset link is either invaild or expired.'
      );
      return res.redirect('/user/forgot-password');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
