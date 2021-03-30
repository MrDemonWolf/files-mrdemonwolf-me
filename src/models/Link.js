const mongoose = require('mongoose');

const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    url: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    qrcode: String,
    clicks: {
      type: Number,
      default: 0
    },
    limit: { type: Number, default: 0 },
    tags: [{ type: String }],
    deleteKey: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

linkSchema.index(
  { tags: 'text', url: 'text' },
  { weights: { tags: 1, url: 2 } }
);

module.exports = mongoose.model('Link', linkSchema);
