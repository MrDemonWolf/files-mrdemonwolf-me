const multer = require('multer');
const path = require('path');
const { customAlphabet } = require('nanoid');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

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
    const ext = path.extname(file.originalname);
    /**
     * TODO Add file filter just to lable the file as a image , text and or file.
     */
    // file.filetype = 'test';

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(
        {
          code: 'FILE_NOT_PERMITTED',
          error: 'This File Type Is Not Permitted.',
          ext
        },
        false
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: process.env.UPLOAD_LIMIT
  }
});
