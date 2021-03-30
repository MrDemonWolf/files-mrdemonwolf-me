const express = require('express');
const { customAlphabet } = require('nanoid/async');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoid32 = customAlphabet(urlFriendyAlphabet, 24);

const router = express.Router();

/**
 * @route /links
 * @method GET
 * @description Displays links created by the user.
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    res.render('links/index', {
      pageTitle: 'My links',
      pageDesc: process.env.DESC,
      pageName: 'links',
      newLinkCode: await nanoid32()
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
