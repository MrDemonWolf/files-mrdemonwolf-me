const path = require('path');
const fs = require('fs-extra');

module.exports = async (req, res, next) => {
  try {
    const customFavicon = await fs.existsSync(
      path.join(__dirname, '../../public/assets/images/custom/favicon.ico')
    );
    if (!customFavicon) {
      return res.status(400).json({
        message: 'There is no custom favico currentlty uploaded.',
        status: 200
      });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', status: 500 });
  }
};
