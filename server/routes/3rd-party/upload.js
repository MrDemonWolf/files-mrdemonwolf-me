const express = require('express');
const passport = require('passport');
const path = require('path');

const { customAlphabet } = require('nanoid');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Upload = require('../../models/Upload');

/**
 * Load middlewares
 */
const isAPIKeyValid = require('../../middleware/isAPIKeyValid');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * Load input validators.
 */

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
/**
 * @route /3rd-party/upload
 * @method POST
 * @description Allows a logged in user to upload using a 3rd-party client.
 */

router.post('/', requireAuth, isAPIKeyValid, async (req, res) => {
  try {
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 64);
    // TODO add validation file check for mineTypes and fileLimit

    // Get the body
    const { stoage, displayName } = req.body;

    // Get the files
    const { name, size, mimetype, mv } = req.files.file;

    const tags = JSON.parse(req.body.tags) || [];
    const extension = path.extname(name);

    // Create a random file name using nanoid
    const fileName = nanoid32();

    // Create a random delete key
    const deleteKey = nanoid32();

    switch (stoage) {
      default:
        // eslint-disable-next-line no-case-declarations
        const filePath = `${path.join(
          __dirname,
          '../../public/uploads'
        )}/${fileName}.${extension}`;
        // Move the file to a public directory in u folder for express
        await mv(filePath);
        break;
    }

    const upload = new Upload({
      uploader: req.user.id,
      displayName,
      fileName,
      fileType: mimetype,
      deleteKey,
      fileSize: size,
      tags
    });

    await upload.save();
    res.status(201).json({
      file: {
        name: fileName,
        size,
        tags,
        url: {
          file: `${process.env.FULL_DOMAIN}/u/${fileName}`,
          delete: `${process.env.FULL_DOMAIN}/u/${fileName}/delete?key=${deleteKey}`
        },
        deleteKey
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
});

module.exports = router;
