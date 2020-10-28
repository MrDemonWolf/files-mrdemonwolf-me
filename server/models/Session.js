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
    isRevoked: {
      type: Boolean,
      default: false
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
