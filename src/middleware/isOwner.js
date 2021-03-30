module.exports = async (req, res, next) => {
  try {
    const owner = process.env.OWNER === 'true';
    if (!owner) {
      return res.status(404).send('Not found');
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
