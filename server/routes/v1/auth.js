const express = require('express');

const router = express.Router();

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', { session: false });
/**
 * Load input validators.
 */
const validateRegisterInput = require('../../../validation/register');

/**
 * @route /v1/register
 * @method POST
 * @description Allows a user to register for a account.
 * @access Public
 *
 * @param (body) {String} username Username of the new account
 * @param (body) {String} email email of the new account
 * @param (body) {String} password Password of the new account
 */
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  res.json({ message: 'Hello World' });
});
