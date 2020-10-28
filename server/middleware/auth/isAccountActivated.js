const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        code: 400,
        error: 'Wrong email or password.'
      });
    }

    if (user.emailVerified) {
      return next();
    }
    res.status(401).send({
      status: 401,
      error:
        'Your account must be activated before you can login. Please check your email you signed up with.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
