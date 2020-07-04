const mongoose = require('mongoose');

const { Schema } = mongoose;

const TwoFactorSchema = new Schema({
  ticket: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  expireAt: {
    type: Date,
    required: true,
    expires: -1
  }
});

module.exports = mongoose.model('TwoFactor', TwoFactorSchema);
