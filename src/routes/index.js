const express = require('express');

const router = express.Router();

/**
 * @route /
 * @method GET
 * @description Displays landing page or
 *  users uploads if they are logged inn
 * @access Public/Private
 */
router.get('/', async (req, res) => {
  /**
   * If the user is logged in this will add
   * the needed data for the logged in render
   */
  try {
    if (req.isAuthenticated()) {
      // If user is banned.
      if (req.user.isBanned) {
        return res.status('401').render('landing/index', {
          pageTitle: 'Your currently banned',
          pageDesc: process.env.DESC,
          pageName: 'uploads'
        });
      }
      // If user is suspended
      if (req.user.isSuspended) {
        return res.status('401').render('landing/index', {
          pageTitle: 'Your currently suspended',
          pageDesc: process.env.DESC,
          pageName: 'uploads'
        });
      }
      return res.render('landing/index', {
        pageTitle: 'Welcome',
        pageDesc: process.env.DESC,
        pageName: 'uploads'
      });
    }
    res.render('landing/index', {
      pageTitle: 'Landing',
      pageDesc: process.env.DESC
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

router.get('/manifest.json', (req, res) => {
  res.json({
    name: process.env.TITLE,
    short_name: process.env.SHORT_TITLE,
    start_url: process.env.FULL_DOMAIN,
    display: 'standalone',
    background_color: '#fff',
    theme_color: 'blue',
    description: process.env.DESC,
    serviceworker: {
      src: './sw.js'
    },
    icons: [
      {
        src: '/assets/images/logo_48.png',
        sizes: '48x48',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_168.png',
        sizes: '168x168',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/assets/images/logo_512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  });
});

module.exports = router;
