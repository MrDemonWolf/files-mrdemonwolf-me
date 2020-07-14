module.exports = async (req, res, next) => {
  try {
    res.status(401).send('Unauthorized');
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};
