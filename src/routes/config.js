const express = require('express');

const router = express.Router();

/**
 * @route /configs
 * @method GET
 * @description Displays a page to create configs for supported uplaoders
 * @access Private
 */
router.get('/', (req, res) => {
  res.render('config/index', {
    pageTitle: 'Config Maker',
    pageDesc: process.env.DESC,
    pageName: 'config'
  });
});

module.exports = router;
