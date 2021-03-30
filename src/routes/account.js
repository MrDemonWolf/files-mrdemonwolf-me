const express = require('express');

const router = express.Router();

/**
 * @route /account
 * @method GET
 * @description Displays a users account details
 * @access Private
 */
router.get('/', (req, res) => {
  res.render('account/index', {
    pageTitle: 'My Account',
    pageDesc: process.env.DESC,
    pageName: 'account'
  });
});

module.exports = router;
