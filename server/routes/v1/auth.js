const express = require('express');
const passport = require('passport');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const jwt = require('jsonwebtoken');

const router = express.Router();

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const User = require('../../models/User');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', { session: false });
/**
 * Load input validators.
 */
const validateRegisterInput = require('../../validation/v1/register');
const validateLoginInput = require('../../validation/v1/login');

/**
 * @route /v1/auth/register
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
 * @route /v1/auth/login
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
      id: user.id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '6h'
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

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

module.exports = router;
