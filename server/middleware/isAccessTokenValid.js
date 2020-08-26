const moment = require('moment');
const sha512 = require('js-sha512');
const Token = require('../models/Token');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const token = authorization
      .split(' ')
      .slice(1)
      .toString();
    const tokenHash = sha512(token);

    const tokenValid = await Token.findOne({
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
