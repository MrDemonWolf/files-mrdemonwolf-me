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
const isSessionValid = require('../middleware/isSessionValid');
const isAdmin = require('../middleware/isAdmin');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * @route /analytics/admin/counts
 * @method GET
 * @description Allow a admin list of counts analytics.
 */
router.get(
  '/admin/counts',
  requireAuth,
  isSessionValid,
  isAdmin,
  async (req, res) => {
    try {
      const uploads = await Upload.find({}).countDocuments();
      res.json({ code: 200, counts: { uploads } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

module.exports = router;
