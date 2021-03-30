const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    label: {
      type: String
    },
    isEnabled: {
      type: String
    },
    setting: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Setting', settingsSchema);
