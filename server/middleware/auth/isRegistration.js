module.exports = async (req, res, next) => {
  try {
    if (process.env.REGISTRATION) {
      return next();
    }
    res.status(401).json({
      code: 401,
      message: 'Currently signups are disabled by the owner.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
