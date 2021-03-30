const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = (req, res, next) => {
  try {
    const expire = req.body;
    let { reason, expireCustom } = req.body;

    reason = !isEmpty(reason) ? reason : '';
    expireCustom = !isEmpty(expireCustom) ? expireCustom : '';

    if (Validator.isEmpty(reason)) {
      return res
        .status(400)
        .json({ message: 'Reason is required.', status: 400 });
    }
    if (expire === 'custom') {
      if (expireCustom === undefined && isEmpty(expireCustom)) {
        return res
          .status(400)
          .json({ message: 'Custom expire date is required.', status: 100 });
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
