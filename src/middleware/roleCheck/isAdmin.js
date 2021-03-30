module.exports = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) return res.status(404).send('Not found');
    if (req.user.role === 'owner') return next();
    if (req.user.role === 'admin') return next();
    res.status(404).send('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
