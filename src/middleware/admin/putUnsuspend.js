const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      slug: req.params.slug
    });

    if (req.user.role === 'owner') {
      return next();
    }

    if (user.role === 'admin') {
      return res.status(401).json({
        message: "You don't have permission to unsuspend a admin."
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
