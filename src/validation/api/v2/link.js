const Validator = require('validator');
const normalizeUrl = require('normalize-url');
const { customAlphabet } = require('nanoid/async');
const isEmpty = require('../../isEmpty');
const Link = require('../../../models/Link');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

module.exports = async (req, res, next) => {
  try {
    // eslint-disable-next-line prefer-const
    let errors = {};

    let { url, code } = req.body;
    const { tags } = req.body;

    url = !isEmpty(url) ? url : '';
    code = !isEmpty(code) ? code : '';

    if (Validator.isEmpty(code)) {
      const nanoid32 = customAlphabet(urlFriendyAlphabet, 24);
      code = await nanoid32();
    } else {
      const isAllowed = RegExp('^[a-zA-Z0-9]*$').exec(code);
      if (!isAllowed) {
        errors.code = 'Invalid code.';
      } else {
        const isAlready = await Link.findOne({ code: req.body.code });
        if (isAlready) {
          errors.code = 'Code has already been used.';
        }
      }
    }

    if (Validator.isEmpty(url)) {
      errors.url = 'Url is required.';
    }

    if (!Validator.isURL(normalizeUrl(url))) {
      errors.code = 'Must be a URL.';
    }

    if (req.body.tags) {
      if (typeof tags !== 'object') {
        errors.tags = 'Tags must be a object';
      }
    }

    if (!isEmpty(errors)) {
      return res.status(400).json({
        auth: true,
        success: false,
        errors,
        status: 400
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
