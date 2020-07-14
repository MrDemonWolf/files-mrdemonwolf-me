const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const UploadSchema = new Schema({
  uploader: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  fileName: {
    type: String,
    required: true
  },
  fileExtension: {
    type: String,
    required: true
  },
  fileMimeType: {
    type: String,
    required: true
  },
  hashes: {
    md5: String,
    sha256: String,
    sha512: String
  },
  fileType: {
    type: String,
    enum: ['file', 'image', 'text'],
    default: 'file'
  },
  storage: {
    type: String,
    enum: ['local'],
    default: 'local'
  },
  tags: [{ type: String }],
  deleteToken: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: moment()
  }
});

UploadSchema.index(
  { tags: 'text', name: 'text', fileName: 'text' },
  { weights: { tags: 1, name: 2, fileName: 3 } }
);

module.exports = mongoose.model('Upload', UploadSchema);
