const express = require('express');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');
const mailer = require('../utils/mailer');

const router = express.Router();

/**
 * Setup nanoid
 */
const emailVerificationToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_',
  32
);
const twoFactorToken = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  64
);

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Session = require('../models/Session');
const TwoFactor = require('../models/TwoFactor');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/auth/isSessionValid');
const isRefreshValid = require('../middleware/auth/isRefreshTokenValid');
const isRegistration = require('../middleware/auth/isRegistration');

/**
 * Load input validators.
 */
const validateRegisterInput = require('../validation/auth/register');
const validateLoginInput = require('../validation/auth/login');
const validateTwoFactorInput = require('../validation/auth/two-factor');

/**
 * Load Email Templates.
 */
const activateAccountTemplate = require('../emails/auth/activate-account');

/**
 * @route /auth/register
 * @method POST
 * @description Allows a user to register for a account.
 */
router.post('/register', isRegistration, async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { codes, errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({ codes, errors });
    }

    const { username, email, password } = req.body;

    /**
     * Check if there is already account using the same email or username
     */
    const alreadyAccount = await User.findOne({
      $or: [{ email }, { newEmail: email }, { username }]
    });

    if (alreadyAccount) {
      return res.status(409).json({
        code: 'ALREADY_EXISTS',
        error: 'This username or email already exists.'
      });
    }

    /**
     * Create the user with the data provided
     * Send them a email with the email verification token.
     */
    const newUser = new User({
      username,
      email,
      password
    });

    newUser.emailVerificationToken = emailVerificationToken();
    newUser.emailVerificationTokenExpire = moment().add('3', 'h');

    await newUser.save();

    const emailTemplate = activateAccountTemplate(
      newUser.emailVerificationToken
    );

    const msg = {
      to: newUser.email,
      from: `${process.env.EMAIL_FROM} <noreply@${process.env.EMAIL_DOMAIN}>`,
      subject: `Activate your account on ${process.env.SITE_TITLE}`,
      html: emailTemplate.html
    };

    if (process.env.NODE_ENV !== 'test') await mailer(msg);

    res.status(201).json({
      code: 'PENDING_CONFIRMATION',
      error: 'Please confirm your email address to complete the registration.'
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
 * @route /auth/login
 * @method POST
 * @description Allows a user to login with their account.
 */
router.post('/login', async (req, res) => {
  try {
    /**
     * Validdate the user important for email,password.
     */

    const { codes, errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, codes, errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 'NON_EXISTENT',
        error: 'Either email or password is invalid. '
      });
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return res.status(400).json({
        code: 'INVALID_CREDENTIALS',
        error: 'Either email or password is invalid. '
      });
    }

    if (user.twoFactor) {
      const newTwoFactorToken = new TwoFactor({
        token: twoFactorToken(),
        user: user.id,
        expiresAt: moment().add('15', 'm')
      });

      await newTwoFactorToken.save();

      return res.status(200).json({
        code: 'TWO_FACTOR_REQUIRED',
        error: 'Two Factor is required to complete login.',
        token: newTwoFactorToken.token,
        twoFactor: true
      });
    }

    /**
     * Create the JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '5m'
    });
    const accessTokenHash = sha512(accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '14d'
    });
    const refreshTokenHash = sha512(refreshToken);

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

    /**
     *  Get the ip location and put it in the session
     */
    const location = req.ipInfo.error
      ? 'unknown'
      : `${req.ipInfo.city}, ${req.ipInfo.region} ${req.ipInfo.country}`;

    /**
     * Create the session in the database
     */
    const session = new Session({
      accessTokenHash,
      refreshTokenHash,
      device,
      location,
      user: user.id,
      expireAt: moment().add('14', 'd')
    });

    await session.save();

    res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      twoFactor: false
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
 * @route /auth/two-factor
 * @method POST
 * @description Allows a user to login with their account.
 */
router.post('/two-factor', async (req, res) => {
  try {
    /**
     * Validdate the user important for email,password.
     */

    const { errors, codes, isValid } = validateTwoFactorInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, codes, errors });
    }

    const { token, code } = req.body;

    const twoFactor = await TwoFactor.findOne({ token }).populate('user');

    if (!twoFactor) {
      return res.status(400).json({
        code: 'INVALID_TWO_FACTOR_TOKEN',
        error: 'Invalid two factor token.'
      });
    }
    /**
     * Verify the two factor code with the secret
     */
    const isTwoFactorValid = authenticator.check(
      code,
      twoFactor.user.twoFactorSecret
    );

    const isTwoFactorBackupCodeValid = twoFactor.user.twoFactorBackupCodes.includes(
      code
    );

    /**
     * Checks both if the Two Factor is valid and or the back up codes are.
     */
    if (!isTwoFactorValid) {
      if (!isTwoFactorBackupCodeValid) {
        return res.status(401).json({
          code: 'INVALID_TWO_FACTOR_CODE',
          error: 'Invalid two factor code.'
        });
      }
    }

    /**
     * Create the JWT payload
     */
    const payload = {
      sub: twoFactor.user.id,
      iss: process.env.WEB_URI
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '5m'
    });
    const accessTokenHash = sha512(accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '14d'
    });
    const refreshTokenHash = sha512(refreshToken);

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

    /**
     *  Get the ip location and put it in the session
     */
    const location = req.ipInfo.error
      ? 'unknown'
      : `${req.ipInfo.city}, ${req.ipInfo.state} ${req.ipInfo.country}`;

    /**
     * Create the session in the database
     */
    const session = new Session({
      accessTokenHash,
      refreshTokenHash,
      device,
      location,
      user: twoFactor.user.id,
      expireAt: moment().add('14', 'd')
    });

    await session.save();

    /**
     * Remove backup code from list as it already has been used.
     */
    await User.findByIdAndUpdate(
      twoFactor.user.id,
      { $pull: { twoFactorBackupCodes: code } },
      { $safe: true, $upsert: true }
    );

    res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken,
      twoFactor: true
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
 * @route /auth/refresh
 * @method POST
 * @description Allows a user to refresh their login token with a new one
 */
router.post('/refresh', isRefreshValid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    /**
     * Remove the old session
     */
    await Session.findOneAndDelete({
      refreshTokenHash: sha512(req.body.refresh_token)
    });

    /**
     * Create new JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '5m'
    });
    const accessTokenHash = sha512(accessToken);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '14d'
    });
    const refreshTokenHash = sha512(refreshToken);

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

    /**
     *  Get the ip location and put it in the session
     */
    const location = req.ipInfo.error
      ? 'unknown'
      : `${req.ipInfo.city}, ${req.ipInfo.state} ${req.ipInfo.country}`;

    /**
     * Create the new session in the database
     */
    const session = new Session({
      accessTokenHash,
      refreshTokenHash,
      device,
      location,
      user: user.id,
      expireAt: moment().add('14', 'd')
    });
    await session.save();
    res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken
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
 * @route /auth/logout
 * @method POST
 * @description Allows a user logout of their account
 */
router.post('/logout', isSessionValid, async (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();
    const accessTokenHash = sha512(token);

    /**
     * Finds and removes the session from the database by marking it as revoked
     */
    await Session.findOneAndDelete({ accessTokenHash });
    res.status(200).json({
      code: 'LOGGED_OUT',
      error: 'You are now logged out.'
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
