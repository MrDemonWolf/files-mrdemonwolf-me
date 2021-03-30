const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
  try {
    const expireValid = ['0', '1', '7', '30'];
    let { label, expire } = req.body;

    let errors = {};

    label = !isEmpty(label) ? label : '';
    expire = !isEmpty(expire) ? expire : '';

    if (Validator.isEmpty(expire)) {
      errors = 'Token is required.';
    }

    if (!expireValid.includes(expire)) {
      errors = 'Not a valid expire timeframe.';
    }
    if (Validator.isEmpty(label)) {
      errors = 'Token Label is required.';
    }
    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect('/tokens');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
