const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const User = require('../models/User');
const Upload = require('../models/Upload');

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
 * @route /uploads
 * @method GET
 * @description Allows a logged in user to get their current uploads
 */
router.get('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    const uploads = await Upload.find({ uploader: req.user.id });

    const totalUploads = uploads.length;

    res.status(200).json({ uploads, total: totalUploads });

  } catch (e) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
