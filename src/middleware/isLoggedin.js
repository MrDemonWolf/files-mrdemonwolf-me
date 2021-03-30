module.exports = (req, res, next) => {
  try {
    if (!req.isAuthenticated()) {
      req.flash('error', 'You need to be logged in to do that!');
      res.redirect('/login');
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
