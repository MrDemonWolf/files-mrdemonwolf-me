const express = require('express');

const router = express.Router();

/**
 * Limiters - this is rate limiters per API or other requests.
 */

/**
 * Load middlewares
 */

/**
 * Load vaildation middleware
 */

/**
 * Routes
 */
const authRoutes = require('./auth');

router.use('/auth', authRoutes);

module.exports = router;
