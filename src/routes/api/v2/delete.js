const express = require('express');

const router = express.Router();

/**
 * Load Middleware
 */
const isDeleteKeyVaild = require('../../../middleware/api/isDeleteKeyVaild');
const isBanned = require('../../../middleware/api/isBanned');

/**
 * Load Controllers
 */
const deleteController = require('../../../controllers/api/v2/delete');

/**
 * Load Validation
 */
const deleteValidation = require('../../../validation/api/v2/delete');

router.get(
  '/',
  isBanned,
  deleteValidation,
  isDeleteKeyVaild,
  deleteController.delete
);

module.exports = router;
