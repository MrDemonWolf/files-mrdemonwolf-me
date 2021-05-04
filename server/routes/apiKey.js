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
    const apiKeys = await APIKey.find({ user: req.user.id });

    const totalAPIKeys = apiKeys.length;

    res.status(200).json({ apiKeys, total: totalAPIKeys });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /apikey/:apikey_id
 * @method GET
 * @description Allows a logged in user to get a single a API Key
 */
router.get('/:apikey_id', requireAuth, isSessionValid, async (req, res) => {
  try {
    const apiKey = await APIKey.findOne({
      _id: req.params.apikey_id,
      user: req.user.id
    });

    if (!apiKey) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'APIKey not found.'
      });
    }

    res.status(200).json({
      apiKey
    });
  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /apikey/:apikey_id
 * @method PATCH
 * @description Allows a logged in user to edit a API Key
 */
router.patch('/:apikey_id', requireAuth, isSessionValid, async (req, res) => {
  try {
    const apiKey = await APIKey.findOne({
      _id: req.params.apikey_id,
      user: req.user.id
    });

    if (!apiKey) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'APIKey not found.'
      });
    }

    apiKey.label = req.body.label || apiKey.label;

    await apiKey.save();
    res.status(200).json({
      code: 'UPDATED',
      message: 'APIKey has been updated'
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /apikey/:apikey_id
 * @method PATCH
 * @description Allows a logged in user to edit a API Key
 */
router.patch('/:apikey_id', requireAuth, isSessionValid, async (req, res) => {
  try {
    const apiKey = await APIKey.findOne({
      _id: req.params.apikey_id,
      user: req.user.id
    });

    if (!apiKey) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'APIKey not found.'
      });
    }

    apiKey.label = req.body.label || apiKey.label;

    await apiKey.save();
    res.status(200).json({
      code: 'UPDATED',
      message: 'APIKey has been updated'
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

/**
 * @route /apikey/:apikey_id
 * @method DELETE
 * @description Allows a logged in user to delete a API Key
 */
router.delete('/:apikey_id', requireAuth, isSessionValid, async (req, res) => {
  try {
    const apiKey = await APIKey.findOne({
      _id: req.params.apikey_id,
      user: req.user.id
    });

    if (!apiKey) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'APIKey not found.'
      });
    }

    await apiKey.delete();
    res.status(200).json({
      code: 'REMOVED',
      message: 'APIKey has been removed'
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
