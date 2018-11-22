const mongoose = require('mongoose');

const defaultOdontontogram = [];

const buildRow = (init, end) => {
  for (let i = init; i < end; i++) {
    defaultOdontontogram.push({
      num: i,
      top: false,
      center: false,
      bottom: false,
      right: false,
      left: false,
    });
  }
};

const createDefaultOdontogram = () => {
  buildRow(11, 19);
  buildRow(21, 29);
  buildRow(31, 39);
  buildRow(41, 49);
  buildRow(51, 56);
  buildRow(61, 66);
  buildRow(71, 76);
  buildRow(81, 86);
  return defaultOdontontogram;
};

const PatientSchema = new mongoose.Schema({
  name: String,
  tel: String,
  address: String,
  city: String,
  age: Number,
  sex: String,
  afiliateNum: Number,
  medicalCoverage: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'MedicalCoverage',
  },
  odontogram: {
    type: [{
      nro: {
        type: Number,
      },
      top: {
        type: Boolean,
        default: false,
      },
      bottom: {
        type: Boolean,
        default: false,
      },
      right: {
        type: Boolean,
        default: false,
      },
      left: {
        type: Boolean,
        default: false,
      },
      center: {
        type: Boolean,
        default: false,
      },
    }, { _id: false }],
    default: createDefaultOdontogram(),
  },
});

module.exports = mongoose.model('Patient', PatientSchema);
