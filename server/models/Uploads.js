const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const uploadSchema = new Schema({
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
  fileMineType: {
    type: String,
    required: true
  },
  storge: {
    type: String,
    enum: ['local'],
    default: 'local'
  },
  fileType: {
    type: String,
    enum: ['file', 'image', 'text'],
    default: 'file'
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

uploadSchema.index(
  { tags: 'text', name: 'text', fileName: 'text' },
  { weights: { tags: 1, name: 2, fileName: 3 } }
);

module.exports = mongoose.model('Upload', uploadSchema);
