module.exports = (req, res, next) => {
  try {
    if (req.user.isSuspended) {
      return res.redirect(401, '/');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
