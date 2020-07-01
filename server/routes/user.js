const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const User = require('../models/User');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/isSessionValid');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

module.exports = router;
