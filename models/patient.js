const moment = require('moment');
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  tel: String,
  address: String,
  city: String,
  birthdate: Date,
  sex: String,
  afiliateNum: Number,
  medicalCoverage: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MedicalCoverage',
  },
  teethNum: Number,
  medicalRecords: [{
    teethNum: Number,
    side: String,
    code: String,
    date: {
      type: Date,
      default: moment(),
    },
  }],
  odontogram: [{
    nro: Number,
    top: Boolean,
    center: Boolean,
    bottom: Boolean,
    right: Boolean,
    left: Boolean,
    state: Number,
  }],
});


module.exports = mongoose.model('Patient', PatientSchema);
