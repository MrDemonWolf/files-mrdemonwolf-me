const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const sha512 = require('js-sha512');

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

/**
 * @route /apikey
 * @method POST
 * @description Allows a logged in user to create a API Key
 */
router.post('/', requireAuth, isSessionValid, async (req, res) => {
  try {
    /**
     * Create the JWT payload
     */
    const payload = {
      sub: req.user.id,
      iss: `${process.env.SITE_TITLE} 3rd-party API`
    };

    const { label, expires } = req.body;

    // Setup variables to use for the switch case statement
    // This is so it can know what date the token should expire and or if never.
    let expireAt;
    let expiresIn;
    let isNever;

    switch (expires) {
      case 'day':
        expireAt = moment().add('24', 'h');
        expiresIn = '24h';
        break;
      case 'week':
        expireAt = moment().add('7', 'd');
        expiresIn = '7d';
        break;
      case 'month':
        expireAt = moment().add('1', 'M');
        expiresIn = '31d';
        break;
      default:
        expireAt = moment().add('100', 'y');
        expiresIn = '36500d';
        isNever = true;
    }

    const apiKey = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    });

    const apiKeyHash = sha512(apiKey);

    await APIKey.create({
      user: req.user.id,
      label,
      hash: apiKeyHash,
      expireAt,
      isNever
    });

    res.status(201).json({
      code: 'ADDED',
      message: 'Added new API Key',
      api_key: apiKey
    });
  } catch (e) {
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
