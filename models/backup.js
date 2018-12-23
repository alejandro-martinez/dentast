const mongoose = require('mongoose');

const BackupSchema = new mongoose.Schema({
  name: String,
  restoredOn: Date,
  date: Date,
});

module.exports = mongoose.model('Backup', BackupSchema);
