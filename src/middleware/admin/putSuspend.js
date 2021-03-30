const User = require('../../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findOne({
      slug: req.params.slug
    });

    if (req.user.id === user.id) {
      return res.status(400).json({
        message: "You can't suspened yourself."
      });
    }
    if (req.user.role === 'owner') {
      return next();
    }

    const owner = user.role === 'owner';
    const admin = user.role === 'admin';
    if (owner || admin) {
      return res.status(401).json({
        message: "This user can't be suspened."
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
