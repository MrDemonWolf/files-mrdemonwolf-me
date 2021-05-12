const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
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
 * @route /stats
 * @method GET
 * @description Allows a logged in user to get current stats
 */
router.get('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    const totalUploads = await Upload.countDocuments({ uploader: req.user.id });

    const totalLinks = 0;

    const totalSpaceUsed = 0;

    res.status(200).json({
      stats: {
        totalUploads,
        totalLinks,
        totalSpaceUsed
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});
module.exports = router;
