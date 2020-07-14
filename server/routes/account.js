const express = require('express');
const passport = require('passport');
const { authenticator } = require('otplib');

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
 * @route /account
 * @method GET
 * @description Allows a logged in user to get there data.
 * @access Private
 */
router.get('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Get the current user data and remove sensitive data
     */
    const user = await User.findById(req.user.id).select('-password -__v');

    res.status(200).json({ code: 200, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/update
 * @method PUT
 * @description Allows a logged in user to update their account details
 * @access Private
 *
 * @param (body) {String} username New Username for the current account
 */
router.put('/update', async (req, res) => {
  try {
    const { username } = req.body;

    /**
     * Updates the user by the user id
     */
    await User.findByIdAndUpdate(
      req.user.id,
      {
        username
      },
      {
        $safe: true
      }
    );
    res.status(200).json({ code: 200, message: 'Updated user profile.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/update/email
 * @method POST
 * @description Allows a logged in user to update their email address with a new one
 * This does require them to have to verify said new email.
 * @access Private
 *
 * @param (body) {String} username New Username for the current account
 */
router.post('/update/email', async (req, res) => {
  try {
    const { newEmail } = req.body;

    /**
     * Finds the user and adds the newEmail to the dataase
     */
    const user = await User.findById(req.user.id);
    user.newEmail = newEmail;

    await user.save();
    res.status(200).json({ code: 200, message: '' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/update/two-factor/:boolean
 * @method PUT
 * @description Allows a logged in user to update their two factor status.
 * @access Private
 *
 * @param (params) {boolean} true/false Enable or disable two factor.
 * @param (body) {String} username New Username for the current account
 */
router.put(
  '/update/two-factor/:boolean',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      // TODO Add validation
      const twofactor = req.params.boolean === 'true';
      const user = await User.findById(req.user.id);

      if (twofactor) {
        /**
         * Create authenticator sercet
         */
        const secret = authenticator.generateSecret();
        user.twofactor = false;
        user.twoFactorSecret = secret;

        await user.save();
        return res.json({
          code: 200,
          secret,
          qrCode: '',
          message:
            'You must verify your two factor code before it will be enabled.'
        });
      }

      /**
       * Check if Two Factor code is valid.
       */
      const isValid = authenticator.check(req.body.code, user.twoFactorSecret);
      if (!isValid) {
        return res.status(401).json({
          code: 401,
          message:
            'Unable to disable two factor due to invaild code.  Please try again.'
        });
      }

      user.twofactor = false;
      user.twoFactorSecret = undefined;
      await user.save();
      res.json({ code: 200, message: 'Two factor has been disabled.' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /account/verify/two-factor/:token
 * @method POST
 * @description Allows a logged in user verify two factor before enabling.
 * @access Private
 *
 * @param (body) {String} username New Username for the current account
 */
router.post(
  '/verify/two-factor/:code',
  requireAuth,
  isSessionValid,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      /**
       * Check if user has initialized Two Factor setup
       */
      if (!user.twoFactor && user.twoFactorSecret) {
        /**
         * Check if Two Factor code is valid
         */
        const isValid = authenticator.check(
          req.params.code,
          user.twoFactorSecret
        );
        if (!isValid) {
          return res.status(401).json({
            code: 401,
            message:
              'Unable to enable two factor due to invaild code.  Please try again.'
          });
        }
        user.twoFactor = true;
        await user.save();
        return res.json({
          code: 200,
          message: 'Verifyed.  Two Factor has been enabled.'
        });
      }
      res.status(400).json({
        code: 400,
        error: 'You start the two factor process before verifying.'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /account/verify/email/:token
 * @method PUT
 * @description Allows a logged in user to update their account details
 * @access Private
 *
 * @param (body) {String} username New Username for the current account
 */
router.put('/verify/email/:token', async (req, res) => {
  try {
    res.status(200).json({ code: 200, message: 'Updated user profile.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /account/delete
 * @method DELETE
 * @description Allows a logged in user to delete their account and all releated infomation.
 * @access Private
 */

/**
 * @route /account/email-change/:token
 * @method POST
 * @description Allows a logged in user to comfirm their email with the token send to it.
 * @access Private
 */

module.exports = router;
