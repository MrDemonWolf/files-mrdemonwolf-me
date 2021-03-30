const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
  try {
    // eslint-disable-next-line prefer-const
    let errors = {};
    const { supportedUploader, sharexType } = req.body;
    const sharexTypes = ['FileUploader', 'ImageUploader', 'TextUploader'];
    const supportedUploaders = ['sharex', 'share-cli'];

    if (!supportedUploaders.includes(supportedUploader)) {
      req.flash('error', 'Not a vaild supported uploader.');
      return res.redirect('/config');
    }

    switch (supportedUploader) {
      case 'sharex':
        if (sharexType === undefined) {
          req.flash('error', 'Uploads enabled is required.');
          return res.redirect('/config');
        }
        if (!sharexTypes.some(data => sharexType.includes(data))) {
          req.flash('error', 'Not a vaild ShareX Type');
          return res.redirect('/config');
        }
        break;
      case 'share-cli':
        break;
      default:
        req.flash('error', 'Not a vaild supported uploader.');
        res.redirect('/config');
        break;
    }

    // if (!isEmpty(errors)) {
    // req.flash('error', errors);
    // return res.redirect('/cpmfog');
    // }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
