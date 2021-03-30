const express = require('express');

const router = express.Router();

/**
 * Load Middleware
 */
const isTokenVaild = require('../../../middleware/api/isTokenVaild');
const fileCheck = require('../../../middleware/api/fileCheck');
const isBannedAPI = require('../../../middleware/api/isBanned');
const isSuspendedAPI = require('../../../middleware/api/isSuspended');

/**
 * Load Controllers
 */
const uploadController = require('../../../controllers/api/v2/upload');

/**
 * Load Validation
 */
const uploadValidation = require('../../../validation/api/v2/upload');

router.post(
  '/',
  isTokenVaild,
  isBannedAPI,
  isSuspendedAPI,
  uploadValidation,
  fileCheck,
  uploadController.uploadFile
);

module.exports = router;
