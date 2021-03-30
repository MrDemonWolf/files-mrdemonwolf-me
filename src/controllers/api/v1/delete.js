const fs = require('fs-extra');
const path = require('path');

/**
 * Load MongoDB models.
 */
const Upload = require('../../../models/Upload');

/**
 * Upload file Controler - Allows users upload a file or image using there API Key
 * This returns the URL where the file is hosted and a delete link.
 */
module.exports.deleteFile = async (req, res, next) => {
  try {
    const upload = await Upload.findOne({ deleteKey: req.query.key });

    const filePath = `${path.join(__dirname, '../../../public')}/u/${
      upload.fileName
    }${upload.fileExtension}`;

    await fs.remove(filePath);
    await upload.remove();
    res.json({
      success: true,
      message: `Deleted file ${upload.fileName}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
};
