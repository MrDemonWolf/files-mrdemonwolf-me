const isEmpty = require('../../isEmpty');

module.exports = (req, res, next) => {
  try {
    // eslint-disable-next-line prefer-const
    let errors = {};

    const key = req.query.key !== undefined && !isEmpty(req.query.key);

    if (!key) {
      errors.key = 'Key is required.';
    }
    if (!isEmpty(errors)) {
      return res.status(400).json({
        auth: true,
        success: false,
        errors,
        status: 400
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
