const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      slug: req.params.slug
    });

    if (req.user.id === user.id) {
      return res.status(401).json({
        message: "You can't delete yourself here. You must to your account.",
        status: 401
      });
    }

    if (req.user.role === 'owner') {
      return next();
    }

    const owner = req.user.role === 'owner';
    const userOwner = user.role === 'owner';
    const userAdmin = user.role === 'admin';
    const userOwnerOrAdmin = userOwner || userAdmin;
    const userSelf = user.id === req.user.id;
    if (!owner && !userSelf && userOwnerOrAdmin) {
      return res.status(401).json({
        message: "You don't have permission to delete this user.",
        status: 401
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
