const normalizeUrl = require('normalize-url');
const Validator = require('validator');

/**
 * Load vaildation middleware
 */
const isEmpty = require('./isEmpty');

/**
 * Load MongoDB models.
 */
const Link = require('../models/Link');

module.exports = async (req, res, next) => {
  try {
    let { code, url } = req.body;

    const { tags } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = '';

    code = !isEmpty(code) ? code : '';
    url = !isEmpty(url) ? url : '';

    if (Validator.isEmpty(url)) {
      errors = 'URL is required.';
    }
    if (!Validator.isURL(normalizeUrl(url))) {
      errors = 'Must be a URL.';
    }
    if (Validator.isEmpty(code)) {
      errors = 'Code is required.';
    } else {
      const isAllowed = RegExp('^[a-zA-Z0-9]*$').exec(code);
      if (!isAllowed) {
        errors = 'Invalid code.';
      } else {
        const isAlready = await Link.findOne({ code });
        if (isAlready) {
          errors = 'Code has already been used.';
        }
      }
    }
    if (req.body.tags) {
      if (typeof tags !== 'object') {
        errors.tags = 'Tags must be a object';
      }
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/links');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
