/**
 * Load MongoDB models.
 */
const Term = require('../models/Term');

/**
 * Put Terms Controller- Updates the terms page
 */
exports.putTerms = async (req, res) => {
  try {
    const { content } = req.body;

    const terms = await Term.findOne({});

    if (!terms) {
      const newTerms = await new Term({
        content
      });
      await newTerms.save();
    } else {
      terms.content = content;
      await terms.save();
    }
    res.json({ message: 'Terms have been updated', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
