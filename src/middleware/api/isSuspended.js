const moment = require('moment');

module.exports = (req, res, next) => {
  try {
    if (req.user.isBanned) {
      return res.status(403).json({
        message: `You are currently suspended for "${
          req.user.suspendedReason
        }" which expires in ${moment(req.user.suspendedExpire).fromNow(true)}`
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
