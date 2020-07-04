const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const LinksSchema = new Schema(
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

LinksSchema.index(
  { tags: 'text', url: 'text' },
  { weights: { tags: 1, url: 2 } }
);

module.exports = mongoose.model('Link', LinksSchema);
