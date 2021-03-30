module.exports = async (req, res, next) => {
  try {
    const { logo } = req.files;

    const allowedMimeType = 'image/png';
    const mimeType = logo.mimetype === allowedMimeType;

    if (!mimeType) {
      return res.status(422).json(
        // example JSON response from server
        {
          error: 'Invaild file.  File must be a PNG.',
          initialPreview: [
            // initial preview thumbnails for server uploaded files if you want it displayed immediately after upload
          ],
          initialPreviewConfig: [
            // configuration for each item in initial preview
          ],
          initialPreviewThumbTags: [
            // initial preview thumbnail tags configuration that will be replaced dynamically while rendering
          ],
          append: false, // whether to append content to the initial preview (or set false to overwrite)
          status: 422
        }
      );
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};
