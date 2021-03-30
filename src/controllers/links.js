const QRCode = require('qrcode');
const { customAlphabet } = require('nanoid/async');
const normalizeUrl = require('normalize-url');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Load vaildation middleware
 */
const isEmpty = require('../validation/isEmpty');

/**
 * Load MongoDB models.
 */
const Link = require('../models/Link');

/**
 * Get link Controler- gets the link from the database
 */
exports.getLink = async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.link });
    if (!link) {
      return res.status(404).send('Not found.');
    }
    link.clicks += 1;
    await link.save();
    res.redirect(link.url);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Create link shorted Controller- Creates a shorted link.
 */
exports.postLink = async (req, res) => {
  try {
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 32);

    const { url, code, limit } = req.body;
    const newLink = new Link({
      creator: req.user.id,
      deleteKey: await nanoid32(),
      url: normalizeUrl(url),
      code,
      limit
    });
    await newLink.save();
    req.flash('info', {
      shortenLink: `${process.env.FULL_DOMAIN}/l/${newLink.code}`,
      url: newLink.url
    });
    res.redirect('/links');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Links lising mini API Controller- Takes data from lib and returns results.
 */
exports.getLinkCode = async (req, res) => {
  try {
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 24);

    res.json({ code: await nanoid32(), status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Links lising mini API Controller- Takes data from lib and returns results.
 */
exports.getLinksListData = async (req, res) => {
  try {
    // Simple query params used by table to sort,limit, and offet.
    const sort = req.query.order === 'asc' ? 1 : -1;
    const limit = parseFloat(req.query.limit);
    const offset = parseFloat(req.query.offset);

    const search = req.query.search !== undefined && !isEmpty(req.query.search);

    const linksSelect =
      'url code clicks limit tags createdAt updatedAt creator';

    let linksData = [];

    if (search) {
      linksData = await Link.find({
        creator: req.user.id,
        $text: { $search: req.query.search }
      })
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(linksSelect);
    } else {
      linksData = await Link.find({ creator: req.user.id })
        .sort({ createdAt: sort })
        .limit(limit)
        .skip(offset)
        .select(linksSelect);
    }

    // eslint-disable-next-line prefer-const
    let links = [];
    let id = 0;
    const promises = linksData.map(async data => {
      links.push({
        id: (id += 1),
        url: data.url,
        code: data.code,
        clicks: data.clicks,
        limit: data.limit,
        updatedAt: data.updatedAt,
        creator: data.creator.username,
        createdAt: data.createdAt,
        tags: data.tags,
        qrCode: await QRCode.toDataURL(
          `${process.env.FULL_DOMAIN}/l/${data.code}`
        )
      });
    });

    await Promise.all(promises);

    const total = linksData.length;

    res.json({
      total,
      rows: links
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Edit link Controler- Allow the user to edit the created link
 */
exports.putLink = async (req, res) => {
  try {
    const { code, tags } = req.body;
    const link = await Link.findOne({ creator: req.user.id, code });

    if (!link) {
      return res.status(404).send('Not found.');
    }
    if (link.code !== code && code !== undefined) {
      link.code = code;
    }
    link.tags = tags;
    await link.save();

    res.json({ message: 'You have updated the link', status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

/**
 * Delte link Controler- Allow the user to delete a link that was created.
 */
exports.deleteLink = async (req, res) => {
  try {
    const { code } = req.body;
    const link = await Link.findOneAndRemove({ creator: req.user.id, code });

    if (!link) {
      return res.status(404).send('Not found.');
    }

    res.json({ message: `${code} has been deleted.`, status: 200 });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
