const path = require('path');
const fs = require('fs-extra');

/**
 * Load MongoDB models.
 */
const Upload = require('.././models/Upload');

/**
 * Delete Upload in gallery - Removes a file from database and filesystem.
 */
exports.deleteSingleUpload = async (req, res) => {
  try {
    const { uploadedFile } = req.params;

    // Gets the uplaoded file ext and file name
    const uploadedFileExt = path.extname(uploadedFile);
    const uploadedFileName = uploadedFile.replace(uploadedFileExt, '');

    // Creats the file path
    const uploadedFilePath = `${path.join(
      __dirname,
      '../public'
    )}/u/${uploadedFile}`;

    // Deletes the upload from database
    const upload = await Upload.findOneAndRemove({
      uploader: req.user.id,
      fileName: uploadedFileName
    });

    if (!upload) {
      if (req.user.streamerMode) {
        req.flash(
          'error',
          `<strong>${uploadedFileName.substring(
            0,
            3
          )}*********************</strong> was not found.`
        );
        return res.redirect('/gallery');
      }
      req.flash('error', `<strong>${uploadedFileName}</strong> was not found.`);
      return res.redirect('/gallery');
    }
    // Deletess uploaded file from disk
    await fs.remove(uploadedFilePath);
    if (req.user.streamerMode) {
      req.flash(
        'success',
        `
        <strong>${uploadedFileName.substring(
    0,
    3
  )}*********************</strong> has been deleted.`
      );
      return res.redirect('/admin/gallery');
    }
    req.flash(
      'success',
      `<strong>${uploadedFileName}</strong> has been deleted.`
    );
    res.redirect('/gallery');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
