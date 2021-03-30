const mongoose = require('mongoose');

const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    accessTokenHash: {
      type: String,
      required: true
    },
    refreshTokenHash: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    device: {
      browser: {
        type: String,
        default: 'unknown'
      },
      version: {
        type: String,
        default: 'unknown'
      },
      platform: {
        type: String,
        default: 'unknown'
      },
      os: {
        type: String,
        default: 'unknown'
      },
      isDev: {
        type: Boolean,
        default: false
      }
    },
    location: {
      type: String,
      default: 'unknown'
    },
    expireAt: {
      type: Date,
      required: true,
      expires: -1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Session', SessionSchema);
