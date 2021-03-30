const { customAlphabet } = require('nanoid/async');
const path = require('path');
const filesize = require('filesize');
const moment = require('moment');
const mineTypes = require('../../../config/mineTypes');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
/**
 * Load MongoDB models.
 */
const User = require('../../../models/User');
const Upload = require('../../../models/Upload');

/**
 * Upload file Controler - Allows users upload a file or image using there API Key
 * This returns the URL where the file is hosted and a delete link.
 */
module.exports.uploadFile = async (req, res, next) => {
  try {
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 32);
    // TODO add vaildation file check
    let { tags } = req.body;
    const { file, name } = req.files;
    const fileExtension = path.extname(file.name);
    const fileMineType = file.mimetype;
    const fileName = await nanoid32();
    const fileNameWithExt = fileName + fileExtension;
    const filePath = `${path.join(
      __dirname,
      '../../../public'
    )}/u/${fileName}${fileExtension}`;
    // Delete key is fileName the delete URL via the get request
    const deleteKey = await nanoid32();

    const size = filesize(file.size);

    // Image check to label as image.
    const isImage = mineTypes.images.includes(fileMineType);
    const isText = mineTypes.text.includes(fileMineType);

    // Sets type based on above.
    const type = isImage ? 'image' : isText ? 'text' : 'file';

    if (tags) {
      tags = tags.split(', ');
    }

    /**
     * Adds the file to the database with basic infomation plus a
     * deleteKey which allows users to remove the file with one click
     */
    const upload = new Upload({
      uploader: req.user.id,
      name,
      fileName,
      fileExtension,
      deleteKey,
      size,
      type,
      tags
    });

    // Log the upload in lastUpload.
    const user = await User.findById(req.user.id);
    user.lastUpload = moment();
    await user.save();
    await upload.save();

    // Move th file to a public directory in u folder for express
    await file.mv(filePath);

    res.json({
      auth: true,
      success: true,
      file: {
        name: fileName,
        ext: fileExtension,
        size,
        tags,
        url: `${process.env.FULL_DOMAIN}/u/${fileNameWithExt}`,
        delete: `${process.env.FULL_DOMAIN}/api/v2/delete?key=${deleteKey}`,
        deleteKey
      },
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
};
