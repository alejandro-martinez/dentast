const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  tel: String,
  address: String,
  city: String,
  age: Number,
  sex: String,
  afiliateNum: Number,
});

module.exports = mongoose.model('User', UserSchema);
