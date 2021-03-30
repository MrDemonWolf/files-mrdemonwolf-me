const rateLimit = require('express-rate-limit');

/**
 * Code gen limiter - Limits requests
 */
exports.codeGen = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: {
    message: 'You are requesting to many new tokens.',
    status: 429
  }
});
