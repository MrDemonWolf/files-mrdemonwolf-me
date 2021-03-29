const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(400).json({
        code: 'NON_EXISTENT',
        error: 'Could not find the users account.'
      });
    }

    if (user.emailVerified) {
      return next();
    }
    res.status(400).send({
      code: 'PENDING_CONFIRMATION',
      error:
        'Your account must be activated before you can do that. Please check your email you signed up with.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'INTERNAL_SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
};
