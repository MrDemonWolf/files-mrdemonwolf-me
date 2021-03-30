const { customAlphabet } = require('nanoid/async');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load MongoDB models.
 */
const Link = require('../../../models/Link');

/**
 * Create link Controler - Alllows a user on the API to create a URL
 */
module.exports.createLink = async (req, res) => {
  try {
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 32);

    const { url, limit } = req.body;
    let { code, tags } = req.body;

    if (code === undefined) {
      const linkCode = customAlphabet(urlFriendyAlphabet, 18);
      code = await linkCode();
    }
    if (tags) {
      tags = tags.split(', ');
    }

    const newLink = new Link({
      creator: req.user.id,
      deleteKey: await nanoid32(),
      url,
      tags,
      code,
      limit
    });

    await newLink.save();

    res.json({
      auth: true,
      success: true,
      link: {
        url: newLink.url,
        code: newLink.code,
        limit,
        tags,
        newurl: `${process.env.FULL_DOMAIN}/l/${newLink.code}`,
        delete: `${process.env.FULL_DOMAIN}/api/v2/delete?key=${newLink.deleteKey}&type=link`,
        deleteKey: newLink.deleteKey
      },
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Get link Controler - Alllows a user to get the link infomation
 */
module.exports.getLink = async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Not found',
        status: 404
      });
    }
    res.json({
      success: true,
      data: link,
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Get link Controler - Alllows a user to get the link infomation
 */
module.exports.getLinks = async (req, res) => {
  try {
    const link = await Link.find({
      creator: req.user.id
    });
    const total = await Link.countDocuments({
      creator: req.user.id
    });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'No links found.',
        status: 404
      });
    }
    res.json({
      success: true,
      data: link,
      total,
      status: 200
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
