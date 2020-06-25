const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const User = require('../../models/User');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', { session: false });

/**
 * @route /v1/user/current
 * @method GET
 * @description Allows a logged in user to get there data.
 * @access Private
 */
router.get('/current', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -__v');

    res.status(200).json({ code: 200, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /v1/user/update
 * @method PUT
 * @description Allows a logged in user to update their account details
 * @access Private
 */

/**
 * @route /v1/user/delete
 * @method DELETE
 * @description Allows a logged in user to delete their account and all releated infomation.
 * @access Private
 */

/**
 * @route /v1/user/email-change/:token
 * @method POST
 * @description Allows a logged in user to comfirm their email with the token send to it.
 * @access Private
 */

module.exports = router;
