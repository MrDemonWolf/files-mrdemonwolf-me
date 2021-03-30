const express = require('express');

const router = express.Router();

/**
 * Load Middleware
 */
const isDeleteKeyVaild = require('../../../middleware/api/isDeleteKeyVaild');
const isTokenVaild = require('../../../middleware/api/isTokenVaild');
const isQueryTokenVaild = require('../../../middleware/api/isQueryTokenVaild');
const isBannedAPI = require('../../../middleware/api/isBanned');
const isSuspendedAPI = require('../../../middleware/api/isSuspended');

/**
 * Load Controllers
 */
const linkController = require('../../../controllers/api/v2/link');

/**
 * Load Validation
 */
const linkValidation = require('../../../validation/api/v2/link');

router.get(
  '/',
  isQueryTokenVaild,
  isBannedAPI,
  isSuspendedAPI,
  linkController.getLinks
);
router.get('/:code', linkController.getLink);

router.post(
  '/',
  isTokenVaild,
  isBannedAPI,
  isSuspendedAPI,
  linkValidation,
  linkController.createLink
);

module.exports = router;
