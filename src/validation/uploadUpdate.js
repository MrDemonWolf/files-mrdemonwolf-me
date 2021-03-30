const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (req, res, next) => {
  try {
    let { fileName } = req.body;
    const { tags } = req.body;

    // eslint-disable-next-line prefer-const
    let errors = {};

    fileName = !isEmpty(fileName) ? fileName : '';

    if (Validator.isEmpty(fileName)) {
      errors.fileName = 'fileName is required.';
    }
    if (typeof tags !== 'object') {
      errors.tags = 'Tags must be a object';
    }
    if (!isEmpty(errors)) {
      if (errors.length > 1) {
        return res
          .status(400)
          .json({ message: `${errors.fileName} and ${errors.tags}` });
      }
      return res.status(400).json({ message: errors.fileName || errors.tags });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
