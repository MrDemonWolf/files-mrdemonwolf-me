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
const deleteController = require('../../../controllers/api/v1/delete');

/**
 * Load Validation
 */
const deleteValidation = require('../../../validation/api/v1/delete');

router.get(
  '/',
  isBanned,
  deleteValidation,
  isDeleteKeyVaild,
  deleteController.deleteFile
);

module.exports = router;
