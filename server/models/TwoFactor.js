const mongoose = require('mongoose');

const { Schema } = mongoose;

const TwoFactorSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: -1
  }
});

module.exports = mongoose.model('TwoFactor', TwoFactorSchema);
