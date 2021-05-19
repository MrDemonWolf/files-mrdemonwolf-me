const moment = require('moment');
const sha512 = require('js-sha512');
const APIKey = require('./../models/APIKey');

module.exports = async (req, res, next) => {
  try {
    /**
     * Get the token from the headers and make it readblae
     */
    const { authorization } = req.headers;

    const apiKey = authorization
      .split(' ')
      .slice(1)
      .toString();

    /**
     * Hash the token to check in the database if it's still valid
     */
    const apikeyHash = sha512(apiKey);

    const apikeyValid = await APIKey.findOne({
      hash: apikeyHash,
      expireAt: {
        $gt: moment()
      }
    });

    /**
     * If it's valid then move on.
     */
    if (apikeyValid) {
      return next();
    }
    res.status(401).send('Unauthorized');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
};
