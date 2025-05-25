const mongoose = require('mongoose');

const TrainingEntrySchema = new mongoose.Schema({
    episode: Number,
    reward: Number,
    loss: Number,
    profitUSD: Number,
    epsilon: Number,
    drawdown: Number,
    hitFrequency: Number,
    modelPath: { type: String, default: null },
    graphImages: { type: [String], default: [] },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TrainingEntry', TrainingEntrySchema);
