const mongoose = require('mongoose');

const MedicalCoverage = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('MedicalCoverage', MedicalCoverage);
