const mongoose = require('mongoose');

const SystemSchema = new mongoose.Schema({
  version: {
    type: String,
    index: true,
  },
  oudated: {
  	type: Boolean,
  	default: false,
  },
});

module.exports = mongoose.model('System', SystemSchema);
