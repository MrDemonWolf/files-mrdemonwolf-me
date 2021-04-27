const mongoose = require('mongoose');

const { Schema } = mongoose;

const UploadSchema = new Schema(
  {
    uploader: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    displayName: String,
    fileName: {
      type: String,
      required: true
    },
    fileSize: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true
    },
    storage: {
      type: String,
      enum: ['local'],
      default: 'local'
    },
    type: {
      type: String,
      enum: ['file', 'image', 'text'],
      default: 'file'
    },
    tags: [{ type: String }],
    deleteKey: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Upload', UploadSchema);
