const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  token: {
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

module.exports = mongoose.model('Session', sessionSchema);
