const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  referralCode: { type: String, required: true, unique: true },
  donations: { type: Number, default: 0 },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);