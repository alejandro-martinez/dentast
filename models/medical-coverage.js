const mongoose = require('mongoose');

const MedicalCoverage = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
});

module.exports = mongoose.model('MedicalCoverage', MedicalCoverage);
