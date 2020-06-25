const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  issuedAt: {
    type: Date,
    required: true
  },
  expiresIn: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Session', sessionSchema);
