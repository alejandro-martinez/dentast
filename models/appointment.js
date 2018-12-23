const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  date: Date,
  startTime: String, // HH:mm
  endTime: String, // HH:mm
  patient: String, // Patient name
  patientId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Patient',
  },
  comments: String,
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
