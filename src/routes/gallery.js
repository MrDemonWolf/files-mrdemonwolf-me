const express = require('express');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Upload = require('../models/Upload');

/**
 * @route /gallery
 * @method GET
 * @description Displays users images in gallery formate with simple tools.
 * @access Private
 */
router.get('/', async (req, res) => {
  try {
    const images = await Upload.find({
      uploader: req.user.id,
      type: 'image'
    })
      .sort({
        uploadedAt: -1
      })
      .select('fileName fileExtension');
    res.render('gallery/index', {
      pageTitle: 'My gallery',
      pageDesc: process.env.DESC,
      pageName: 'gallery',
      images
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
