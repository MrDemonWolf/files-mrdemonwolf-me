const moment = require('moment');
const sha512 = require('js-sha512');
const Token = require('../../models/Token');

module.exports = async (req, res, next) => {
  try {
    let { token } = req.body;
    if (!token) {
      req.flash('error', 'Token must be provided');
      return res.redirect('/config');
    }
    const tokenArray = token.split(' ');
    if (tokenArray.length === 1) {
      token = tokenArray.toString();
    } else {
      token = tokenArray.slice(1).toString();
    }

    const tokenHash = sha512(token);
    const tokenVaild = await Token.findOne({
      user: req.user.id,
      hash: tokenHash,
      expireAt: {
        $gt: moment()
      }
    });

    if (!tokenVaild) {
      req.flash('error', 'Token is either expired or is invaild');
      return res.redirect('/config');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
