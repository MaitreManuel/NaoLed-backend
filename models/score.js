const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  id: Object,
  value: Number,
  time: String
}, { collection: 'score' });

class ScoreClass {
  getId() {
    return this.id;
  }

  getValue() {
    return this.value;
  }

  getTime() {
    return this.time;
  }
}

ScoreSchema.loadClass(ScoreClass);
module.exports = mongoose.model('Score', ScoreSchema);
