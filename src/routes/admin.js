const express = require('express');
const password = require('generate-password');
const { customAlphabet } = require('nanoid/async');

const urlFriendyAlphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const nanoid32 = customAlphabet(urlFriendyAlphabet, 24);

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Upload = require('../models/Upload');
const User = require('../models/User');
const Term = require('../models/Term');

/**
 * Load middlewares
 */
const isOwner = require('../middleware/roleCheck/isOwner');

/**
 * @route /admin
 * @method GET
 * @description Displays a admin dashboard
 * @access Private
 */
router.get('/', async (req, res) => {
  const uploads = await Upload.countDocuments();
  const users = await User.countDocuments();
  const files = await Upload.countDocuments({ type: 'file' });
  const images = await Upload.countDocuments({ type: 'image' });
  const texts = await Upload.countDocuments({ type: 'text' });

  res.render('admin/index', {
    pageTitle: 'Admin Area',
    pageDesc: process.env.DESC,
    pageName: 'admin',
    uploads,
    users,
    files,
    images,
    texts
  });
});

/**
 * @route /admin/uploads
 * @method GET
 * @description Displays all the uploads from all users.
 * @access Private
 */
router.get('/uploads', (req, res) => {
  res.render('admin/uploads', {
    pageTitle: 'Uploads',
    pageDesc: process.env.DESC,
    pageName: 'adminUploads'
  });
});

/**
 * @route /admin/gallery
 * @method GET
 * @description Displays all the uploads from all users in gallery formate
 * @access Private
 */
router.get('/gallery', async (req, res) => {
  const images = await Upload.find({ type: 'image' }).select(
    'fileName fileExtension'
  );
  res.render('admin/gallery', {
    pageTitle: 'Gallery',
    pageDesc: process.env.DESC,
    pageName: 'adminGallery',
    images
  });
});

/**
 * @route /admin/links
 * @method GET
 * @description Displays all the links added by the users.
 * @access Private
 */
router.get('/links', async (req, res) => {
  try {
    res.render('admin/links', {
      pageTitle: 'Links',
      pageDesc: process.env.DESC,
      pageName: 'adminLinks',
      newLinkCode: await nanoid32()
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route /admin/users
 * @method GET
 * @description Displays users from the database
 * @access Private
 */
router.get('/users', (req, res) => {
  res.render('admin/users/index', {
    pageTitle: 'Users',
    pageDesc: process.env.DESC,
    pageName: 'adminUsers'
  });
});

/**
 * @route /admin/users/new
 * @method GET
 * @description Allows the admins to creat ea new user.
 * @access Private
 */
router.get('/users/new', async (req, res) => {
  try {
    const generatePassword = password.generate({
      length: 18,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true
    });
    res.render('admin/users/new', {
      pageTitle: 'Create User',
      pageDesc: process.env.DESC,
      pageName: 'adminNewUsers',
      generatePassword
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route /admin/users/:slug
 * @method GET
 * @description Displays a users details.
 * @access Private
 */
router.get('/users/:slug', async (req, res) => {
  try {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
      return res.status(404).send('Not found');
    }
    res.render('admin/users/view', {
      pageTitle: 'View User',
      pageDesc: process.env.DESC,
      pageName: 'adminUsersView',
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route /admin/users/edit/:slug
 * @method GET
 * @description Displays a users details to edit.
 * @access Private
 */
router.get('/users/edit/:slug', async (req, res) => {
  try {
    const user = await User.findOne({ slug: req.params.slug });
    if (!user) {
      return res.status(404).send('Not found');
    }
    res.render('admin/users/edit', {
      pageTitle: 'Edit User',
      pageDesc: process.env.DESC,
      pageName: 'adminUsersEdit',
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

/**
 * @route /admin/settings
 * @method GET
 * @description Displays a page to create configs for supported uplaoders
 * @access Private
 */
router.get('/settings', isOwner, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'owner' } });
    const terms = await Term.findOne({});
    res.render('admin/settings/index', {
      pageTitle: 'Settings',
      pageDesc: process.env.DESC,
      pageName: 'adminSettings',
      users,
      terms
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
