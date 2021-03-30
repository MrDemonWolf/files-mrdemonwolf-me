const express = require('express');

const router = express.Router();

/**
 * Load middlewares
 */
const isAlreadyAuth = require('../middleware/isAlreadyLoggedin');

/**
 * @route /login
 * @method GET
 * @description Displays the login form
 * @access Public
 */
router.get('/login', isAlreadyAuth, (req, res) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    pageDesc:
      'Do you already have an account? Login and start uploading within minutes.',
    pageName: 'login'
  });
});

/**
 * @route /signup
 * @method GET
 * @description Displays the login form
 * @access Public
 */
router.get('/signup', isAlreadyAuth, (req, res) => {
  res.render('auth/signup', {
    pageTitle: 'Create account',
    pageDesc:
      'No account yet? Create your free account within one minute and start uploading.',
    pageName: 'signup'
  });
});

module.exports = router;
