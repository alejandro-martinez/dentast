const moment = require('moment');
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  tel: String,
  address: String,
  city: String,
  birthdate: Date,
  sex: String,
  notes: String,
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
    ticketNum: Number,
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
