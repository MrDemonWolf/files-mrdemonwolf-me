const express = require('express');
const passport = require('passport');

const router = express.Router();

/**
 * Load MongoDB models.
 */
const Users = require('../models/User');
const Upload = require('../models/Upload');
const Links = require('../models/Links');

/**
 * Load middlewares
 */
const isSessionValid = require('../middleware/isSessionValid');
const isAdmin = require('../middleware/isAdmin');

/**
 * Require authentication middleware.
 */
const requireAuth = passport.authenticate('jwt', {
  session: false
});

/**
 * @route /admin/users
 * @method GET
 * @description Allow a admin to get a list all the users.
 */
router.get('/users', requireAuth, isSessionValid, isAdmin, async (req, res) => {
  try {
    /**
     * TODO add limit,from,to, and more.
     */
    const users = await Users.find({}).select('-password -__v');
    res.status(200).json({ code: 200, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

/**
 * @route /admin/uploads
 * @method GET
 * @description Allow a admin to get a list uploads.
 */
router.get(
  '/uploads',
  requireAuth,
  isSessionValid,
  isAdmin,
  async (req, res) => {
    try {
      /**
       * TODO add limit,from,to, and more.
       */
      const uploads = await Upload.find({});
      res.status(200).json({ code: 200, uploads });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /admin/uploads/:id
 * @method GET
 * @description Allows admin to get upload details by it's ID.
 */
router.get(
  '/uploads/:upload_id',
  requireAuth,
  isSessionValid,
  isAdmin,
  async (req, res) => {
    try {
      /**
       * Finds a single upload by it's id.
       */
      const upload = await Upload.findById(req.params.upload_id);
      if (!upload) {
        return res.status(404).json({
          code: 404,
          error: 'Upload you are looking for is in another world.'
        });
      }
      res.status(200).json({ code: 200, upload });
    } catch (err) {
      console.log(err);
      res.status(500).json({ code: 500, error: 'Internal Server Error' });
    }
  }
);

/**
 * @route /admin/links
 * @method GET
 * @description Allow a admin to get a list shorten links.
 */
router.get('/links', requireAuth, isSessionValid, isAdmin, async (req, res) => {
  try {
    /**
     * TODO add limit,from,to, and more.
     */
    const links = await Links.find({});
    res.status(200).json({ code: 200, links });
  } catch (err) {
    console.log(err);
    res.status(500).json({ code: 500, error: 'Internal Server Error' });
  }
});

module.exports = router;
