const express = require('express');
const passport = require('passport');
const moment = require('moment');
const qrcode = require('qrcode');
const { authenticator } = require('otplib');

const { customAlphabet } = require('nanoid');

const mailer = require('../utils/mailer');

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
const twoFactorBackupCode = customAlphabet('0123456789', 8);

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
const validateChangeEmailInput = require('../validation/account/change-email');
const validateChangePasswordInput = require('../validation/account/change-password');
const validateChangeUsernameInput = require('../validation/account/change-username');
const validateEnableTwoFactorInput = require('../validation/account/enable-two-factor');
const validateDisableTwoFactorInput = require('../validation/account/disable-two-factor');

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
      '-password -twoFactorSecret -twoFactorBackupCodes -emailVerificationToken -emailVerificationTokenExpire'
    );

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /sessions
 * @method GET
 * @description Allows a logged in user to get their current sessions.
 */
router.get('/sessions', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Get the current user data and remove sensitive data
     */
    const sessions = await Session.find({
      user: req.user.id
    }).select('-user -__v -updatedAt');

    res.status(200).json({ sessions, total: sessions.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /sessions/:session_id
 * @method delete
 * @description Allows a logged in user to revoke a session.
 */
router.delete(
  '/sessions/:session_id',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      const session = await Session.findByIdAndDelete(req.params.session_id);

      if (!session) {
        return res
          .status(404)
          .json({ code: 'SESSION_NOT_FOUND', error: 'Session not found.' });
      }

      res.status(200).json({
        code: 'SESSION_REVOKED',
        error: 'Session has been revoked.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
    }
  }
);

/**
 * @route /sessions
 * @method delete
 * @description Allows a logged in user to revoke all active sessions

 */
router.delete('/sessions', requireAuth, isSessionValid, async (req, res) => {
  try {
    await Session.deleteMany({ user: req.user.id, isRevoked: { $ne: true } });
    res.status(200).json({
      code: 'ALL_SESSIONS_REVOKE',
      error: 'All Sessions has been revoked.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /account/change-email
 * @method POST
 * @description Allows a logged in user to change their email
 */
router.post('/change-email', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { codes, errors, isValid } = validateChangeEmailInput(req.body);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }

    const { email } = req.body;

    /**
     * Get the current logged in account from the database
     */
    const user = await User.findById(req.user.id);

    if (email === user.email) {
      return res.status(409).json({
        code: 'EMAIL_CONFLICT',
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
        code: 'ALREADY_EXISTS',
        error: 'The email you are attempting to change to is already in use.'
      });
    }

    user.emailVerificationToken = emailVerificationToken();
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

    if (process.env.NODE_ENV !== 'test') await mailer(msg);

    res.status(200).json({
      code: 'PENDING_CONFIRMATION',
      message:
        'Please check your new email address to complate the email change.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /account/change-email/resend
 * @method POST
 * @description Allows a logged in user to resend email change confirmation.
 */
router.post(
  '/change-email/resend',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user.newEmail) {
        return res.status(400).json({
          code: 'EMAIL_CHANGE_NOT_REQUESTED',
          error: 'You have not requsted a email change.'
        });
      }

      user.emailVerificationToken = emailVerificationToken();
      user.emailVerificationTokenExpire = moment().add('3', 'h');

      await user.save();

      const emailTemplate = verifyNewEmailTemplate(user.emailVerificationToken);

      const msg = {
        to: user.newEmail,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `Verify your new email on ${process.env.SITE_TITLE}`,
        html: emailTemplate.html
      };

      if (process.env.NODE_ENV !== 'test') await mailer(msg);

      res.status(200).json({
        code: 'PENDING_CONFIRMATION',
        message:
          'Please check your new email address to complate the email change.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
    }
  }
);

/**
 * @route /account/change-email/:email_token
 * @method PUT
 * @description Allow a logged in user to change their email with email verify token.
 */
router.put(
  '/change-email/:email_token',
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
          code: 'EXPIRED_CONFIRMATION',
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

      res.status(200).json({
        code: 'EMAIL_CHANGED',
        message: 'Your email has been changed successfully.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
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
       * Validdate the user input oldPassword,newPassword
       */
      const { codes, errors, isValid } = validateChangePasswordInput(req.body);

      if (!isValid) {
        return res.status(400).json({ codes, errors });
      }

      /**
       * Get the user.
       */
      const user = await User.findById(req.user.id);

      const { oldPassword, newPassword } = req.body;

      const isPasswordSame = await user.verifyPassword(newPassword);

      if (isPasswordSame) {
        return res.status(409).json({
          code: 'PASSWORD_CONFLICT',
          errors: {
            newPassword: 'New password can not match old password.'
          }
        });
      }

      const isMatch = await user.verifyPassword(oldPassword);

      if (!isMatch) {
        return res.status(401).json({
          code: 'INVALID_CREDENTIALS',
          error: 'Wrong old password.'
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
        os: req.useragent.os !== 'unknown' ? req.body.useragent.os : 'Other',
        browser:
          req.useragent.browser !== 'unknown' ? req.useragent.browser : 'Other'
      };

      const emailTemplate = changePasswordTemplate(ipInfo, device);

      const msg = {
        to: user.email,
        from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
        subject: `Your password has been changed on ${process.env.SITE_TITLE}`,
        html: emailTemplate.html
      };

      if (process.env.NODE_ENV !== 'test') await mailer(msg);

      res.status(200).json({
        code: 'PASSWORD_CHANGED',
        message: 'Your password has been changed.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
    }
  }
);

/**
 * @route /account/change-username
 * @method PUT
 * @description Allows logged in user to change their username
 */
router.put(
  '/change-username',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      /**
       * Validdate the user input oldPassword,newPassword
       */
      const { codes, errors, isValid } = validateChangeUsernameInput(req.body);

      if (!isValid) {
        return res.status(400).json({ codes, errors });
      }

      const user = await User.findById(req.user.id);

      const { username } = req.body;

      const isAlready = await User.findOne({ username });

      if (!isAlready) {
        user.username = username;
        await user.save();
        return res.status(200).json({
          code: 'USERNAME_CHANGED',
          message: `Your username has been changed to ${user.username}`
        });
      }
      res.status(409).json({
        code: 'USERNAME_CONFLICT',
        error: `${username} is currently not available.`
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
    }
  }
);

/**
 * @route /account/two-factor/backpup-codes
 * @method GET
 * @description Allows a logged in user with two factor enabled to download their backup codes.
 */
router.get(
  '/two-factor/backup-codes',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      /**
       * Check if the user has initialize the two factor
       */
      if (!req.user.twoFactorSecret) {
        return res.status(400).send({
          code: 'TWO_FACTOR_NOT_INITIALIZE',
          error:
            'You must first initialize Two Factor before you can download backup codes.'
        });
      }

      const user = await User.findById(req.user.id);

      res
        .attachment(`${process.env.SITE_TITLE.toLowerCase()}-backup-codes.txt`)
        .send(user.twoFactorBackupCodes.join(' '));
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 'SERVER_ERROR',
        error: 'Internal Server Error.'
      });
    }
  }
);

/**
 * @route /account/two-factor
 * @method POST
 * @description Allows a logged in user to initialize the enable of two factor on their account.
 */
router.post('/two-factor', requireAuth, isSessionValid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    /**
     * Create backup codes first
     */
    const backupCodes = [];

    for (let i = 0; i < 4; i += 1) {
      backupCodes.push(twoFactorBackupCode());
    }

    /**
     * Setup the Two Factor by creaing a secret
     */
    const twoFactorSecret = authenticator.generateSecret();

    user.twoFactorSecret = twoFactorSecret;

    user.twoFactorBackupCodes = backupCodes;

    await user.save();

    /**
     * Setup a QR Code for auto import of secret
     */
    const otpauth = authenticator.keyuri(
      user.email,
      process.env.SITE_TITLE,
      twoFactorSecret
    );
    const qrcodeDataURL = await qrcode.toDataURL(otpauth);

    res.status(200).json({
      code: 'PENDING_VERIFICATION',
      error: 'Two Factor is pending verification.',
      qrCode: qrcodeDataURL,
      secret: twoFactorSecret,
      backupCodes
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /account/two-factor
 * @method PUT
 * @description Allows a logged in user to  enable of two factor on their account after initialize.
 */
router.put('/two-factor', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Check if the user has initialize the two factor
     */
    if (!req.user.twoFactorSecret) {
      return res.status(400).send({
        code: 'TWO_FACTOR_NOT_INITIALIZE',
        error: 'You must first initialize Two Factor before you can enable it.'
      });
    }

    /**
     * Validdate the user important for username,email,password
     */
    const { codes, errors, isValid } = validateEnableTwoFactorInput(req.body);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }

    const user = await User.findById(req.user.id);

    /**
     * Verify the two factor code with the secret
     */
    const isTwoFactorValid = authenticator.check(
      req.body.code,
      user.twoFactorSecret
    );

    if (!isTwoFactorValid) {
      return res.status(400).json({
        code: 'INVALID_TWO_FACTOR_TOKEN',
        error: 'Invalid two factor code.'
      });
    }

    user.twoFactor = true;

    await user.save();

    res.status(200).json({
      code: 'TWO_FACTOR_ENABLED',
      message: 'Two factor has been enabled.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /account/two-factor
 * @method DELETE
 * @description Allows a logged in user to initialize the enable of two factor on their account.
 */
router.delete('/two-factor', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Validdate the user import for two factor
     */
    const { codes, errors, isValid } = validateDisableTwoFactorInput(req.query);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }
    /**
     * Find the user
     */
    const user = await User.findById(req.user.id);

    /**
     * Check if the user has initialize the two factor and or has enabled it.
     */
    if (!user.twoFactor) {
      return res.status(400).send({
        code: 'TWO_FACTOR_NOT_INITIALIZE',
        error:
          'You must first initialize Two Factor and have it enabled before it can be removed.'
      });
    }
    /**
     * Verify the two factor code with the secret
     */
    const isTwoFactorValid = authenticator.check(
      req.query.code,
      user.twoFactorSecret
    );

    if (!isTwoFactorValid) {
      return res.status(400).json({
        code: 'INVALID_TWO_FACTOR_TOKEN',
        error: 'Invalid two factor code.'
      });
    }
    user.twoFactor = undefined;
    user.twoFactorSecret = undefined;
    user.twoFactorBackupCodes = undefined;

    await user.save();

    res.status(200).json({
      code: 'TWO_FACTOR_DISABLED',
      message: 'Two factor has been disabled.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
