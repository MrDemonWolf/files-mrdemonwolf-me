const multer = require('multer');
const path = require('path');
const { customAlphabet } = require('nanoid');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load Minetype config
 */
const mimeType = require('../config/mimetype');

/**
 * Process.env
 */
const fileCheck = process.env.FILE_CHECK === 'true';

module.exports.clientUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
      const randomFileName = customAlphabet(urlFriendyAlphabet, 32);
      const ext = path.extname(file.originalname);
      const fileName = `${randomFileName()}${ext}`;
      cb(null, fileName);
    }
  }),
  fileFilter: (req, file, cb) => {
    /**
     * Check file minetype to see what file type it is and if it's allowed.
     */
    const { mimetype } = file;
    const isImage = mimeType.images.includes(mimetype);
    const isText = mimeType.text.includes(mimetype);

    file.type = isImage ? 'image' : isText ? 'text' : 'file';

    if (fileCheck) {
      const allowemimeType = mimeType.files.concat(
        mimeType.images.concat(mimeType.text)
      );

      const isAllowedFile = allowemimeType.includes(mimetype);

      if (isAllowedFile) {
        return cb(null, true);
      }
      return cb(
        {
          code: 'FILE_NOT_PERMITTED',
          error: 'This File Type Is Not Permitted.',
          mimetype
        },
        false
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: process.env.UPLOAD_LIMIT || 104857600
  }
});
