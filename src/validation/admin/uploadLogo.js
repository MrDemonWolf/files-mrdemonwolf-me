module.exports = (req, res, next) => {
  try {
    if (typeof req.files.logo === 'undefined') {
      req.flash('error', 'Logo is required.');
      return res.redirect('/admin/settings');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
