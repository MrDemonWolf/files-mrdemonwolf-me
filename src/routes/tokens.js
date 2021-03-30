const express = require('express');

const router = express.Router();
/**
 * @route /tokens
 * @method GET
 * @description Displays a users tokens for uploading with a link to the docs
 * @access Private
 */
router.get('/', (req, res) => {
  res.render('tokens/index', {
    pageTitle: 'My Tokens',
    pageDesc: process.env.DESC,
    pageName: 'tokens'
  });
});

module.exports = router;
