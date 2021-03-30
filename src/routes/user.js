const express = require('express');

const router = express.Router();

/**
 * Load MongoDB models.
 */

/**
 * Load middlewares
 */
const isPasswordResetTokenVaild = require('../middleware/isPasswordResetTokenVaild');

/**
 * @route /user/forgot-password
 * @method GET
 * @description Displays form to send a recover password link.
 * @access Public/Private
 */
router.get('/forgot-password', (req, res) => {
  res.render('user/forgot-password', {
    pageTitle: 'Recover password',
    pageDesc:
      'Forgot your password? No problem - you can reset your password on this page.',
    pageName: 'forgotPassword'
  });
});

/**
 * @route /user/reset-password/:token
 * @method GET
 * @param param token Reset token sent in email
 * @description Displays form to recover your password.
 * @access Public/Private
 */
router.get('/reset-password/:token', isPasswordResetTokenVaild, (req, res) => {
  res.render('user/reset-password', {
    pageTitle: 'Recover your password',
    pageDesc: 'Reset your password and get access to your account',
    pageName: 'forgotPassword'
  });
});

/**
 * @route /user/resend-activation
 * @method GET
 * @description Displays form to recover your password.
 * @access Public/Private
 */
router.get('/resend-activation', (req, res) => {
  res.render('user/resend-activation', {
    pageTitle: 'Account activation',
    pageDesc: 'Resend activation email and get access to your ccount',
    pageName: 'resendActivation'
  });
});

module.exports = router;
