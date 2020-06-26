const express = require('express');

const router = express.Router();

/**
 * Routes
 */
const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
