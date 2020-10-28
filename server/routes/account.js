const express = require('express');
const passport = require('passport');
const moment = require('moment');

const { customAlphabet } = require('nanoid/async');

const sendgrid = require('../config/sendgrid');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Session = require('../models/Session');

/**
 * Setup nanoid
 */
const emailVerificationToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_',
  64
);

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/auth/isSessionValid');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * Load input validators.
 */
const validateEmailChangeInput = require('../validation/account/email-change');

/**
 * Load Email Templates.
 */
const verifyNewEmailTemplate = require('../emails/account/new-email');
const changePasswordTemplate = require('../emails/account/change-password');

/**
 * @route /account
 * @method GET
 * @description Allows a logged in user to get their account details.
 */
router.get('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Get the current user data and remove sensitive data
     */
    const user = await User.findById(req.user.id).select(
      '-password -twoFactorSecret -emailVerificationToken -emailVerificationTokenExpire'
    );

    res.status(200).json({ code: 200, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/email-change
 * @method POST
 * @description Allows a logged in user to change their email
 */
router.post('/email-change', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { errors, isValid } = validateEmailChangeInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, errors });
    }

    const { email } = req.body;
    /**
     * Get the current logged in account from the database
     */
    const user = await User.findById(req.user.id);

    if (email === user.email) {
      return res.status(409).json({
        code: 409,
        error:
          'The email you are attempting to change to is the same as your current one.'
      });
    }

    /**
     * Check if the email is already in used or already being changed too.
     */
    const isAlready = await User.findOne({
      $or: [{ email }, { newEmail: email }]
    });

    if (isAlready) {
      return res.status(409).json({
        code: 409,
        error: 'The email you are attempting to change to is already in use.'
      });
    }

    user.emailVerificationToken = await emailVerificationToken();
    user.emailVerificationTokenExpire = moment().add('3', 'h');
    user.newEmail = email;

    await user.save();

    const emailTemplate = verifyNewEmailTemplate(user.emailVerificationToken);

    const msg = {
      to: user.newEmail,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Veify your new email on ${process.env.SITE_TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

    res.status(200).json({
      code: 200,
      message:
        'Please check your new email address to complate the email change.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/email-change/resend
 * @method POST
 * @description Allows a logged in user to resend email change confirmation.
 */
router.post(
  '/email-change/resend',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user.newEmail) {
        return res.status(400).json({
          code: 400,
          error: 'You have not requsted a email change.'
        });
      }

      user.emailVerificationToken = await emailVerificationToken();
      user.emailVerificationTokenExpire = moment().add('3', 'h');

      await user.save();

      const emailTemplate = verifyNewEmailTemplate(user.emailVerificationToken);

      const msg = {
        to: user.newEmail,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `Verify your new email on ${process.env.SITE_TITLE}`,
        html: emailTemplate.html
      };

      if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

      res.status(200).json({
        code: 200,
        message:
          'Please check your new email address to complate the email change.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /account/email-change/:email_token
 * @method PUT
 * @description Allow a logged in user to change their email with email verify token.
 */
router.put(
  '/email-change/:email_token',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      /**
       * Get the user by their email token
       */
      const user = await User.findOne({
        emailVerificationToken: req.params.email_token,
        emailVerificationTokenExpire: { $gt: moment() }
      });

      if (!user) {
        return res.status(400).json({
          code: 400,
          error:
            'Either your new email confirmation link has expired or already has been used.'
        });
      }
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpire = undefined;
      user.email = user.newEmail;
      user.newEmail = undefined;
      user.emailChanged = moment();

      await user.save();

      res.status(201).json({
        code: 201,
        message: 'Your email has been changed successfully.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /account/change-password
 * @method PUT
 * @description Allows a logged in user to change their password.
 */
router.put(
  '/change-password',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      /**
       * Get the user.
       */
      const user = await User.findById(req.user.id);

      const { oldPassword, newPassword } = req.body;

      const isPasswordSame = await user.verifyPassword(newPassword);

      if (isPasswordSame) {
        return res.status(409).json({
          code: 409,
          errors: { newPassword: 'New password can not match old password.' }
        });
      }

      const isMatch = await user.verifyPassword(oldPassword);

      if (!isMatch) {
        return res.status(409).json({
          code: 409,
          errors: { oldPassword: 'Wrong old password.' }
        });
      }

      user.password = newPassword;

      await user.save();

      await Session.deleteMany({
        user: req.user.id
      });

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
        os: req.body.device.os ? req.body.device.os : 'null',
        browser: req.body.device.browser ? req.body.device.browser : 'null'
      };

      const emailTemplate = changePasswordTemplate(ipInfo, device);

      const msg = {
        to: user.email,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `Your password has been changed on ${process.env.SITE_TITLE}`,
        html: emailTemplate.html
      };

      // if (process.env.NODE_ENV !== 'test') await sendgrid.send(msg);

      res.status(200).json({
        code: 200,
        message: 'Your password has been changed.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
