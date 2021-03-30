const express = require('express');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Upload = require('../models/Upload');

/**
 * @route /i/:fileName
 * @method GET
 * @description Displays a view of the uploaded image with few details.
 * @access Public
 */
router.get('/i/:fileName', async (req, res) => {
  try {
    const upload = await Upload.findOne({
      fileName: req.params.fileName,
      type: 'image'
    });

    if (!upload) {
      res.status(404).send('Not found');
    }

    res.render('view/image', {
      pageTitle: `Viewing ${upload.name || upload.fileName}`,
      pageDesc: process.env.DESC,
      upload,
      pageName: 'viewImage'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
