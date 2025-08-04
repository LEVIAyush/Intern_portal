const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  donations: { type: Number, required: true },
  rank: { type: Number, required: true },
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);