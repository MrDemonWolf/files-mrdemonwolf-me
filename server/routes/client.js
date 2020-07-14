const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const passport = require('passport');
const { customAlphabet } = require('nanoid');
const filesize = require('filesize');
const md5 = require('js-md5');
const sha256 = require('js-sha256');
const sha512 = require('js-sha512');

const router = express.Router();

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load Multer configs
 */
const { clientUpload } = require('../config/multer');
/**
 * Load MongoDB models.
 */
const Upload = require('../models/Upload');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * @route /client/upload
 * @method POST
 * @description Allow a admin to get a list uploads.
 * @access Private
 */
router.post('/upload', requireAuth, async (req, res) => {
  try {
    await clientUpload.single('file')(req, res, async error => {
      if (error) {
        if (error.code) {
          switch (error.code) {
            case 'LIMIT_FILE_SIZE':
              res.status(413).json({
                code: 413,
                error: `File Size is too large. Allowed file size is ${filesize(
                  process.env.UPLOAD_LIMIT || 104857600
                )}`
              });
              break;
            case 'FILE_NOT_PERMITTED':
              res.status(403).json({
                code: 403,
                error: 'This file type is not permitted on this service.'
              });
              break;
            default:
              break;
          }
          return;
        }
        return res.json(error);
      }
      if (!req.file) {
        return res.status(422).json({
          code: 422,
          error: 'File is required.'
        });
      }

      const { originalname, mimetype, size, type } = req.file;
      const deleteToken = customAlphabet(urlFriendyAlphabet, 32);
      const fileExtension = path.extname(originalname);
      const fileName = originalname;
      const fileMimeType = mimetype;
      const fileType = type;
      const fileSize = size;
      const buffer = await fs.readFile(req.file.path);
      const hashes = {
        md5: md5(buffer),
        sha256: sha256(buffer),
        sha512: sha512(buffer)
      };

      /**
       * Sets type based on above.
       */
      const newUpload = new Upload({
        uploader: req.user.id,
        name: fileName,
        fileName,
        fileExtension,
        fileMimeType,
        fileType,
        fileSize,
        hashes,
        deleteToken: deleteToken()
      });

      // await newUpload.save();

      res.json({
        success: true,
        message: 'File uploaded successfully!',
        upload: newUpload,
        url: `${process.env.WEB_URI}/u/`,
        deleteUrl: `${process.env.API_URI}/client/delete/token=${newUpload.deleteToken}`
      });
    });
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
