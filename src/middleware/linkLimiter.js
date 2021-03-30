/**
 * Load MongoDB models.
 */
const Link = require('../models/Link');

module.exports = async (req, res, next) => {
  try {
    const link = await Link.findOne({ code: req.params.link });
    const clicks = link.clicks + 1;

    if (link.limit === 0) {
      return next();
    }
    if (link.limit < clicks) {
      return res.status(404).send('Not found.');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
