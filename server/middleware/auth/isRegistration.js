module.exports = async (req, res, next) => {
  try {
    if (process.env.REGISTRATION) {
      return next();
    }
    res.status(409).json({
      code: 'REGISTRATION_DISABLED',
      error: 'Currently registration are disabled.'
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 'SERVER_ERROR',
      error: 'Internal Server Error.'
    });
  }
};
