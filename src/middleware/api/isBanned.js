module.exports = (req, res, next) => {
  try {
    if (req.user.isBanned) {
      return res.status(403).json({
        message: `You are currently banned till: Indefinite`
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
