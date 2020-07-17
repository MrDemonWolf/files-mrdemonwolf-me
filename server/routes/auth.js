const express = require('express');
const passport = require('passport');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');
const { authenticator } = require('otplib');

const router = express.Router();

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Session = require('../models/Session');
const TwoFactor = require('../models/TwoFactor');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/isSessionValid');
const isRefreshValid = require('../middleware/isRefreshValid');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * Load input validators.
 */
const validateRegisterInput = require('../validation/v1/register');
const validateLoginInput = require('../validation/v1/login');

/**
 * @route /auth/register
 * @method POST
 * @description Allows a user to register for a account.
 * @access Public
 *
 * @param (body) {String} username Username of the new account
 * @param (body) {String} email Email of the new account
 * @param (body) {String} password Password of the new account
 */
router.post('/register', async (req, res) => {
  try {
    /**
     * Validdate the user important for username,email,password
     */
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, errors });
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
        code: 409,
        error: 'The email you are attempting to sign up with is already in use.'
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
    const emailVerificationToken = customAlphabet(urlFriendyAlphabet, 32);

    newUser.emailVerificationToken = emailVerificationToken();
    newUser.emailVerificationTokenExpire = moment().add('3', 'h');

    /**
     * TODO send email verification token to the email.
     */

    await newUser.save();

    res.json({
      code: 200,
      message: 'Please confirm your email address to complete the registration.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/login
 * @method POST
 * @description Allows a user to login with their account.
 * @access Public
 *
 * @param (body) {String} email Email of the current account.
 * @param (body) {String} password Password of the current account.
 */
router.post('/login', async (req, res) => {
  try {
    /**
     * Validdate the user important for email,password.
     */
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({ code: 400, errors });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 400,
        error: 'Wrong email or password.'
      });
    }

    const vailidPassword = user.verifyPassword(password);

    if (!vailidPassword) {
      return res.status(400).json({
        code: 400,
        error: 'Wrong email or password.'
      });
    }

    /**
     * Check if the user has Two Factor
     */
    if (user.twoFactor) {
      const twoFactorToken = customAlphabet(urlFriendyAlphabet, 32);

      const newTwoFactor = new TwoFactor({
        token: twoFactorToken(),
        user: user.id,
        expireAt: moment().add('15', 'm')
      });

      await newTwoFactor.save();

      return res.json({
        code: 200,
        twoFactor: true,
        token: newTwoFactor.token,
        message: 'Enter your verification code.'
      });
    }
    /**
     * Create the JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const tokenHash = sha512(token);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

    /**
     * Create the session in the database
     */
    const session = new Session({
      tokenHash,
      refreshTokenHash,
      user: user.id,
      expireAt: moment().add('24', 'h')
    });
    await session.save();
    res.json({
      code: 200,
      token,
      refreshToken,
      twoFactor: false
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/two-factor
 * @method POST
 * @description Allows a user to login with two factor.
 * @access Public
 *
 * @param (body) {String} token Token provided to verify your two factor .
 * @param (body) {String} Code generated by your Two Factor App.
 */
router.post('/two-factor', async (req, res) => {
  try {
    const { code } = req.body;

    /**
     * Check if the Two Factor token is valid
     */
    const twoFactor = await TwoFactor.findOne({
      token: req.body.token,
      expireAt: {
        $gt: moment()
      }
    }).populate({
      path: 'user',
      select: 'twoFactor twoFactorSecret'
    });

    if (!twoFactor) {
      return res.status(401).send('Unauthorized');
    }

    /**
     * Check if the Two Factor code is valid
     */
    const isValid = authenticator.check(code, twoFactor.user.twoFactorSecret);
    if (!isValid) {
      return res
        .status(400)
        .json({ code: 400, error: 'Invalid Two Factor code.' });
    }
    /**
     * Create the JWT payload
     */
    const payload = {
      sub: twoFactor.user.id,
      iss: process.env.WEB_URI
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const tokenHash = sha512(token);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

    /**
     * Create the session in the database
     */
    const session = new Session({
      tokenHash,
      refreshTokenHash,
      user: twoFactor.user.id,
      expireAt: moment().add('24', 'h')
    });
    await session.save();

    /**
     * Remove the TwoFactor token and login jwt
     */
    await twoFactor.remove();
    res.json({
      code: 200,
      token,
      refreshToken,
      twoFactor: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/refresh
 * @method POST
 * @description Allows a user to refresh their login token with a new one
 * @access Private
 *
 * @param (header) {String} authorization JWT Token for the account
 */
router.post('/refresh', requireAuth, isRefreshValid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    /**
     * Create new JWT payload
     */
    const payload = {
      sub: user.id,
      iss: process.env.WEB_URI
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const tokenHash = sha512(token);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

    /**
     * Create the new session in the database
     */
    const session = new Session({
      tokenHash,
      refreshTokenHash,
      user: user.id,
      expireAt: moment().add('24', 'h')
    });
    await session.save();
    res.json({
      code: 200,
      token,
      refreshToken
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /auth/logout
 * @method POST
 * @description Allows a user logout of their account
 * @access Private
 *
 * @param (header) {String} authorization JWT Token for the account
 */
router.post('/logout', isSessionValid, async (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();
    const tokenHash = sha512(token);

    /**
     * Finds and removes the session from the database by marking it as revoked
     */
    await Session.findOneAndUpdate(
      { tokenHash },
      {
        isRevoked: true
      },
      { $safe: true }
    );
    res.json({
      code: 200,
      message: 'You are now logged out.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
