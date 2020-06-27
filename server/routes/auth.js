const express = require('express');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const sha512 = require('js-sha512');
const jwt = require('jsonwebtoken');

const router = express.Router();

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Session = require('../models/Session');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/isSessionValid');

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
    // Validdate the user important for username,email,password
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
      return res.status(403).json({
        code: 403,
        error: 'The email you are attempting to sign up with is already in use.'
      });
    }

    /**
     * Create the user with the data provided
     * Send them a email with the email verification token
     */
    const newUser = new User({
      username,
      email,
      password
    });
    const emailVerificationToken = customAlphabet(urlFriendyAlphabet, 32);

    newUser.emailVerificationToken = emailVerificationToken();
    newUser.emailVerificationTokenExpire = moment().add('3', 'h'); // Sets the token to expire in 3 hours.

    // TODO send email verification token to the email.

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
 * @param (body) {String} email Email of the new account
 * @param (body) {String} password Password of the new account
 */
router.post('/login', async (req, res) => {
  try {
    // Validdate the user important for email,password
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
     * Create the JWT payload
     */
    const payload = {
      id: user.id,
      audience: process.env.FULL_DOMAIN
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m'
    });
    const tokenHash = sha512(token);

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });
    const refreshTokenHash = sha512(refreshToken);

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
 * @route /auth/logout
 * @method DELETE
 * @description Allows a user logout of their account
 * @access Private
 */
router.delete('/logout', isSessionValid, async (req, res) => {
  try {
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();
    const tokenHash = sha512(token);

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
