const Leaderboard = require('../models/Leaderboard');

exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ donations: -1 });
    if (!leaderboard || leaderboard.length === 0) {
      return res.json([
        { name: 'Ayush Negi', donations: 500, rank: 1 },
        { name: 'Negi', donations: 400, rank: 2 },
      ]);
    }
    res.json(leaderboard);
  } catch (err) {
    console.error('Leaderboard error:', err.message);
    res.json([
        { name: 'Ayush Negi', donations: 500, rank: 1 },
        { name: 'Negi', donations: 400, rank: 2 },
    ]);
  }
};