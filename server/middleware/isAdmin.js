const moment = require('moment');

module.exports = async (req, res, next) => {
  try {
    const { role } = req.user;

    // If user role is admin or owner move on.
    if (role === 'admin' || role === 'owner') {
      return next();
    }
    res.status(401).send('Unauthorized');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
