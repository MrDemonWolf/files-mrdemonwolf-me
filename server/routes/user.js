const express = require('express');
const moment = require('moment');

const { customAlphabet } = require('nanoid');

const mailer= require('../utils/mailer');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

/**
 * Setup nanoid
 */
const passwordResetToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_',
  64
);
const emailVerificationToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_',
  32
);

/**
 * Load input validators.
 */
const validateForgotPasswordInput = require('../validation/user/forgot-password');
const validateResetPasswordInput = require('../validation/user/reset-password');

/**
 * Load Email Templates.
 */
const forgotPasswordTemplate = require('../emails/user/forgot-password');
const resetPasswordTemplate = require('../emails/user/reset-password');
const activateAccountTemplate = require('../emails/auth/activate-account');

/**
 * @route /user/forgot-password
 * @description Allows a register user to request a password reset email.
 */
router.post('/forgot-password', async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { codes, errors, isValid } = validateForgotPasswordInput(req.body);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }

    const { email } = req.body;

    /**
     * Get the user by there email
     */
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 'NON_EXISTENT',
        error: 'There is no account with that email.'
      });
    }

    /**
     * Last changed date
     */
    const lastChanged = moment().diff(
      moment(user.passwordResetTokenExpire),
      'minutes'
    );

    if (lastChanged <= 5 && lastChanged <= -5) {
      return res.status(429).json({
        code: 429,
        error:
          'You either requested or changed your password recently.  Please try again later.'
      });
    }

    user.passwordResetToken = passwordResetToken();
    user.passwordResetTokenExpire = moment().add('15', 'm');

    await user.save();

    const emailTemplate = forgotPasswordTemplate(user.passwordResetToken);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Reset your password on ${process.env.SITE_TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await mailer(msg);

    res.status(200).json({
      code: 'PENDING_CONFIRMATION',
      error: `An Email has been sent to ${email} with further instructions on how to reset your password. Please check your email account.`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /user/reset-password/:reset_token
 * @description Allows a register user to request a password reset email.
 */
router.post('/reset-password/:reset_token', async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { codes, errors, isValid } = validateResetPasswordInput(req.body);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }

    /**
     * Get the user by there email
     */
    const user = await User.findOne({
      passwordResetToken: req.params.reset_token,
      passwordResetTokenExpire: {
        $gt: moment()
      }
    });

    if (!user) {
      return res.status(400).json({
        code: 'EXPIRED_OR_ALREADY_USED',
        error: 'Either your reset link has expired or already has been used.'
      });
    }

    /**
     * Get the IP details and place it in a object
     */
    const ipInfo = {
      city: req.ipInfo.city,
      state: req.ipInfo.region,
      country: req.ipInfo.country,
      ip: req.ipInfo.ip,
      localhost: req.ipInfo.error
    };

    /**
     * Device Details in a object
     */
    const device = {
      browser:
        req.useragent.browser !== 'unknown' ? req.useragent.browser : 'unknown',
      version:
        req.useragent.version !== 'unknown' ? req.useragent.version : 'unknown',
      platform:
        req.useragent.os !== 'unknown'
          ? req.useragent.versioplatformn
          : 'unknown',
      os: req.useragent.os !== 'unknown' ? req.useragent.os : 'unknown',

      isDev: req.useragent.browser === 'PostmanRuntime'
    };

    const emailTemplate = resetPasswordTemplate(ipInfo, device);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Your password has been changed on ${process.env.SITE_TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await mailer(msg);

    /**
     * Sets the token and expire date to undfined which removes them
     * from the database
     */
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      code: 'UPDATED',
      error:
        'Your passsword has been updated.  Please try logging in with your new password.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /user/activate-account/:activate_token
 * @description Allows a register user to activate their account with token.
 */
router.put('/activate-account/:activate_token', async (req, res) => {
  try {
    /**
     * Get the user by there email
     */
    const user = await User.findOne({
      emailVerificationToken: req.params.activate_token,
      emailVerificationTokenExpire: {
        $gt: moment()
      }
    });

    if (!user) {
      return res.status(400).json({
        code: 'EXPIRED_OR_ALREADY_USED',
        error:
          'Either your account activate link has expired or already has been used.'
      });
    }
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpire = undefined;
    user.emailVerified = true;

    await user.save();
    res.status(200).json({
      code: 'ACTIVATED',
      message: `Good job! Your account is now activated and you can start using ${process.env.SITE_TITLE}.`
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /user/activate-account/resend
 * @description Allows a register user resend account activate token to tehir email.
 */
router.post('/activate-account/resend', async (req, res) => {
  try {
    /**
     * Get the user by there email
     */
    const user = await User.findOne({
      emailVerified: { $ne: true },
      email: req.body.email
    });

    if (!user) {
      return res.status(409).json({
        code: 'NON_EXISTENT_OR_ALREADY_ACTIVATED',
        error: 'Your account already activated or there is no such account.'
      });
    }

    user.emailVerificationToken = emailVerificationToken();
    user.emailVerificationTokenExpire = moment().add('3', 'h');

    await user.save();

    const emailTemplate = activateAccountTemplate(user.emailVerificationToken);

    const msg = {
      to: user.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Activate your account on ${process.env.SITE_TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await mailer(msg);

    res.status(200).json({
      code: 'PENDING_CONFIRMATION',
      message: 'Please check your email address to complete the registration.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
