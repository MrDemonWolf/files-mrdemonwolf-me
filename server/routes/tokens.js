const express = require('express');
const passport = require('passport');
const moment = require('moment');
const mongoose = require('mongoose');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Token = require('../models/Token');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * @route /tokens
 * @method GET
 * @description Tokens
 * @access Private
 */

router.get('/', requireAuth, async (req, res) => {
  try {
    const query = {
      user: req.user.id,
      expireAt: {
        $gt: moment()
      }
    };
    const tokens = await Token.find(query);
    const _total = await Token.find(query).countDocuments();

    res.status(200).json({ code: 200, tokens, _total });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /tokens
 * @method GET
 * @description Tokens
 * @access Private
 */

router.get('/:token_id', requireAuth, async (req, res) => {
  try {
    const { token_id } = req.params;
    /**
     * Check for a valid mongo objectId
     */
    if (!mongoose.Types.ObjectId.isValid(token_id)) {
      return res.status(400).json({
        code: 400,
        error: 'Invalid Id'
      });
    }
    const token = await Token.findOne({
      _id: token_id,
      user: req.user.id,
      expireAt: {
        $gt: moment()
      }
    });

    if (!token) {
      return res.status(404).json({
        code: 404,
        error: 'No matching token could be found.'
      });
    }
    res.status(200).json({ code: 200, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
