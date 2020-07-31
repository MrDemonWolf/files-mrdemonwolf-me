/**
 * Load MongoDB models.
 */
const Upload = require('../models/Upload');

module.exports = async deleteToken => {
  /**
   * Find the upload file by deleteKey
   */
  const upload = await Upload.findOne({ deleteToken });

  console.log(upload);
};
