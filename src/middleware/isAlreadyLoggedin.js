module.exports = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect('back');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
