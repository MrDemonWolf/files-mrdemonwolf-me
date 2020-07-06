const moment = require('moment');
const sha512 = require('js-sha512');
const Session = require('../models/Session');

module.exports = async (req, res, next) => {
  try {
    /**
     * Get the token from the headers and make it readblae
     */
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();

    /**
     * Hash the token to check in the database if it's still valid
     */
    const tokenHash = sha512(token);

    const tokenValid = await Session.findOne({
      tokenHash,
      expireAt: {
        $gt: moment()
      },
      isRevoked: { $ne: true }
    });

    /**
     * If it's valid then move on.
     */
    if (tokenValid) {
      return next();
    }
    res.status(401).send('Unauthorized');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
