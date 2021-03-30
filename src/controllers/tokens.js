const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');
const moment = require('moment');

/**
 * Load MongoDB models.
 */
const Token = require('.././models/Token');

/**
 * Create Token Controler - Creates a API token for the user to use with sharex or other tools.
 */
exports.postToken = async (req, res, next) => {
  try {
    if (req.user.streamerMode) {
      req.flash(
        'error',
        "Your currently in streamer mode.  Which means you can't create tokens"
      );
      return res.redirect('/tokens');
    }
    const { label, expire } = req.body;

    // Setup variables to use for the switch case statement
    // This is so it can know what date the token should expire and or if never.
    let expireAt;
    let expiresIn;
    let isNever;

    switch (expire) {
      case '1':
        expireAt = moment().add('24', 'h');
        expiresIn = '24h';
        break;
      case '7':
        expireAt = moment().add('7', 'd');
        expiresIn = '7d';
        break;
      case '30':
        expireAt = moment().add('1', 'M');
        expiresIn = '31d';
        break;
      default:
        expireAt = moment().add('100', 'y');
        expiresIn = '36500d';
        isNever = true;
    }

    // Creates the JWT Token/API Token
    const jwtToken = jwt.sign({}, process.env.JWT_SECRET, {
      issuer: process.env.TITLE,
      subject: req.user.id.toString(),
      expiresIn
    });

    // Gets the hash of the token to store in the database to verify later.s
    const jwtHash = sha512(jwtToken);

    // Stores the hash of the token with the user and expireAt which the token will be removed when it expires due to MongoDB expire.s
    const token = new Token({
      user: req.user.id,
      hash: jwtHash,
      label,
      expireAt,
      isNever
    });

    await token.save();

    req.flash('info', jwtToken);
    if (process.env.NODE_ENV === 'test') {
      res.set('API-Token', jwtToken);
      res.set('API-Token-ID', token.id);
    }
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Rename label Token Controler - Allows users to rename label there tokens
 */
exports.putToken = async (req, res, next) => {
  try {
    const { label } = req.body;

    // Find the token by the ID in the params and updates the label.
    await Token.findByIdAndUpdate(
      req.params.token_id,
      {
        label
      },
      { $safe: true, $upsert: true }
    );
    req.flash('success', `Token has been to <strong>${label}</strong>.`);
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete Token Controler - Deletes a token via the token id.
 */
exports.deleteToken = async (req, res, next) => {
  try {
    // Finds the token and removes it from the database.
    const token = await Token.findByIdAndDelete(req.params.token_id);
    if (!token) {
      return res.status(404).json({
        message: `<strong>${token.label}</strong> was not found.`,
        status: 404
      });
    }
    res.json({
      message: `<strong>${token.label}</strong> has been deleted.`,
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delete All Tokens Controler - Deletes all a users tokens
 */
exports.deleteAllTokens = async (req, res, next) => {
  try {
    // Finds all the user tokens and get the token id.
    const tokens = await Token.find({ user: req.user.id });

    if (tokens.length === 0) {
      req.flash('error', 'You have not created any tokens.');
      return res.redirect('/tokens');
    }
    // Takes the tokens Ids and deletes all of them.
    await Token.deleteMany({ user: req.user.id });
    req.flash('success', 'All your tokens have been removed.');
    res.redirect('/tokens');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Tokens lising mini API Controller- Takes data from lib and returns results.
 */
exports.getTokenListData = async (req, res) => {
  try {
    // Simple query params used by table to sort,limit, and offet.
    const sort = req.query.order === 'asc' ? 1 : -1;
    const limit = parseFloat(req.query.limit);
    const offset = parseFloat(req.query.offset);

    // Uses the params to find the tokens.
    const tokensData = await Token.find({ user: req.user.id })
      .sort({ createdAt: sort })
      .limit(limit)
      .skip(offset)
      .select('id label expireAt isNever createdAt');

    const tokens = [];
    let id = 0;
    // Creates a tokensData object to return in a json reply.
    tokensData.map(data => {
      tokens.push({
        id: (id += 1),
        _id: data.id,
        createdAt: data.createdAt,
        label: data.label,
        isNever: data.isNever,
        expires: data.isNever ? moment().add('100', 'y') : data.expireAt
      });
    });

    const total = await Token.countDocuments({
      user: req.user.id
    });

    res.json({
      total,
      rows: tokens
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
