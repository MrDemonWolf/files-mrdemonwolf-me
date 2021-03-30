module.exports = async (req, res, next) => {
  try {
    const signups = process.env.SIGNUPS === 'true';
    if (!signups) {
      req.flash('error', 'Signups are currently disabled');
      return res.redirect('/signup');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
