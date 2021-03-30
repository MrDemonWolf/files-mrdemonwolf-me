const isEmpty = require('../../isEmpty');

module.exports = (req, res, next) => {
  try {
    let errors = {};

    if (typeof req.files.file === 'undefined') {
      errors = 'File is required.';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        auth: true,
        success: false,
        errors
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
