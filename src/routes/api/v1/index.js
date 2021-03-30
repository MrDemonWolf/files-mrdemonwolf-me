const express = require('express');

const router = express.Router();

/**
 * Routes
 */
const uploadRoutes = require('./upload');
const deleteRoutes = require('./delete');

router.get('/', (req, res) => {
  res.json({
    endpoints: [
      { method: 'GET', path: '/' },
      { method: 'POST', path: '/api/v1/upload' },
      { method: 'GET', path: '/api/v1/delete' }
    ],
    status: 200
  });
});

router.use('/upload', uploadRoutes);
router.use('/delete', deleteRoutes);

module.exports = router;
