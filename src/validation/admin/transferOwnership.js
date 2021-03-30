const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
  try {
    let { slug } = req.body;

    let errors = {};

    slug = !isEmpty(slug) ? slug : '';

    if (Validator.isEmpty(slug)) {
      errors = 'Slug is required.';
    }

    if (!isEmpty(errors)) {
      req.flash('error', errors);
      return res.redirect(`/admin/settigs`);
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
