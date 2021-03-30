const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      slug: req.params.slug
    });
    if (user.mfa === false) {
      return res.status(400).json({
        message: 'User does not have MFA enabled at this moment.'
      });
    }
    if (user.role === 'owner') {
      return res.status(401).json({
        message: "MFA can't be disabled for this user."
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
