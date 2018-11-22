const md5 = require('md5');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
});

UserSchema.pre('save', () => {
  if (this.isNew) {
    this.password = md5(this.password);
  }
});

module.exports = mongoose.model('User', UserSchema);
