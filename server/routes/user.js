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

/**
 * @route /user/current
 * @method GET
 * @description Allows a logged in user to get there data.
 * @access Private
 */
router.get('/current', requireAuth, isSessionValid, async (req, res) => {
  try {
    // Get the current user data and remove sensitive data
    const user = await User.findById(req.user.id).select('-password -__v');

    res.status(200).json({ code: 200, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /user/update
 * @method PUT
 * @description Allows a logged in user to update their account details
 * @access Private
 */

/**
 * @route /user/delete
 * @method DELETE
 * @description Allows a logged in user to delete their account and all releated infomation.
 * @access Private
 */

/**
 * @route /user/email-change/:token
 * @method POST
 * @description Allows a logged in user to comfirm their email with the token send to it.
 * @access Private
 */

module.exports = router;
