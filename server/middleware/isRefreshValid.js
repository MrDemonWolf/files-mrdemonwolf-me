const moment = require('moment');
const sha512 = require('js-sha512');
const Session = require('../models/Session');

module.exports = async (req, res, next) => {
  try {
    /**
     * Get the refresh token from the headers and make it readblae
     */
    const { authorization } = req.headers;

    const refreshToken = authorization
      .split(' ')
      .slice(1)
      .toString();

    /**
     * Hash the token to check in the database if it's still valid
     */
    const refreshTokenHash = sha512(refreshToken);

    const refreshTokenValid = await Session.findOne({
      refreshTokenHash,
      expireAt: {
        $gt: moment()
      },
      isRevoked: { $ne: true }
    });

    /**
     * If it's valid then move on.
     */
    if (refreshTokenValid) {
      return next();
    }
    res.status(401).send('Unauthorized');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
