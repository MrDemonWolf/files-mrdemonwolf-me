module.exports = (req, res, next) => {
  try {
    if (req.user.role === 'owner') {
      req.flash(
        'error',
        "You are currently the owner.  Therefor you can't delete your account"
      );
      return res.redirect('/account');
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
