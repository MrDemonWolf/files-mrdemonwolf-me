module.exports = (req, res, next) => {
  try {
    if (!req.isAuthenticated() || req.user.role !== 'owner') {
      res.status(404).send('Not found');
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
