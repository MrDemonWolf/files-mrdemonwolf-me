const express = require('express');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Uploads = require('../models/Uploads');

/**
 * @route /client/upload
 * @method POST
 * @description Allow a admin to get a list uploads.
 * @access Private
 */
router.post('/upload', async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /client/link
 * @method POST
 * @description Allow a admin to get a list uploads.
 * @access Private
 */
router.post('/link', async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
