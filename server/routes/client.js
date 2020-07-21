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
 */
// TODO Add token middleware
router.post('/upload', requireAuth, async (req, res) => {
  try {
    /**
     * Multer setup for returning errors and etc.
     */
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
      /**
       * If no file then should fail
       */
      if (!req.file) {
        return res.status(422).json({
          code: 422,
          error: 'File is required.'
        });
      }

      /**
       * Setup file metdata for database
       */
      // eslint-disable-next-line object-curly-newline
      const { originalname, mimetype, size, type, filename } = req.file;
      const deleteToken = customAlphabet(urlFriendyAlphabet, 32);
      const fileExtension = path.extname(originalname);
      const fileOriginalName = path.parse(originalname).name;
      const fileName = path.parse(filename).name;
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
        name: fileOriginalName,
        fileOriginalName,
        fileName,
        fileExtension,
        fileMimeType,
        fileType,
        fileSize,
        hashes,
        deleteToken: deleteToken()
      });

      await newUpload.save();

      res.json({
        success: true,
        message: 'File uploaded successfully!',
        upload: newUpload,
        url: `${process.env.WEB_URI}/u/${newUpload.fileName}`,
        deleteUrl: `${process.env.API_URI}/u/${newUpload.fileName}?token=${newUpload.deleteToken}`
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /client/upload/delete
 * @method DELETE
 * @description Allow a admin to get a list uploads.
 */
router.delete('/upload/delete', async (req, res) => {
  try {
    const { deleteToken } = req.body;
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /client/link
 * @method POST
 * @description Allow a admin to get a list uploads.
 */
// TODO Add token middleware
router.post('/link', async (req, res) => {
  try {
    console.log('hello');
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
