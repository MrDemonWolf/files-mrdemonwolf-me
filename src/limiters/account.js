const rateLimit = require('express-rate-limit');

/**
 * Space used limiter - Limits requests
 */
exports.spaceUsed = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    message: 'Too many reqeusts.',
    status: 429
  }
});
