const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const APIKey = require('../models/APIKey');

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

/**
 * @route /apikey
 * @method GET
 * @description Allows a logged in user to get their current api keys
 */
router.get('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    const apikeys = await APIKey.find({ user: req.user.id });

    const totalAPIKeys = apikeys.length;

    res.status(200).json({ apikeys, total: totalAPIKeys });
  } catch (e) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
