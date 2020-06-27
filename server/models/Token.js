const mongoose = require('mongoose');

const { Schema } = mongoose;

const tokenSchema = new Schema({
  tokenHash: {
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
});

module.exports = mongoose.model('Token', tokenSchema);
