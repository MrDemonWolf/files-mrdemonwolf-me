const moment = require('moment');
const sha512 = require('js-sha512');
const Token = require('../../models/Token');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(400)
        .json({ error: 'API Token must be provided', status: 400 });
    }
    const tokenArray = authorization.split(' ');
    let token;
    if (tokenArray.length === 1) {
      token = tokenArray.toString();
    } else {
      token = tokenArray.slice(1).toString();
    }

    const tokenHash = sha512(token);
    const tokenVaild = await Token.findOne({
      hash: tokenHash,
      expireAt: {
        $gt: moment()
      }
    }).populate({
      path: 'user',
      select: 'username email avatar role streamerMode isVerified id'
    });

    if (!tokenVaild) {
      return res.status(401).json({
        error: 'API Token is either expired or is invaild.',
        status: 401
      });
    }
    req.user = tokenVaild.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
