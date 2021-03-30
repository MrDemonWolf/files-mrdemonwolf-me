const moment = require('moment');

const Upload = require('../../models/Upload');
const Link = require('../../models/Link');

module.exports = async (req, res, next) => {
  try {
    const upload = await Upload.findOne({ deleteKey: req.query.key }).populate({
      path: 'uploader',
      select: 'isBanned isSuspended suspendedExpire suspendedReason'
    });
    const link = await Link.findOne({ deleteKey: req.query.key }).populate({
      path: 'creator',
      select: 'isBanned isSuspended suspendedExpire suspendedReason'
    });

    const uploadBlocked = upload.isBanned || upload.isSuspended;
    const banned = upload.isBanned || link.isBanned;
    const user = upload.uploader;
    const linkBlocked = link.isBanned || link.isSuspended;

    if (uploadBlocked || linkBlocked) {
      return res.status(403).json({
        message: `You are currently ${banned ? 'banned' : 'suspended'} till: ${
          banned ? 'Indefinite' : moment(user.suspendedExpire).fromNow(true)
        }`
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
