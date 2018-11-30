const mongoose = require('mongoose');

const StairsSchema = new mongoose.Schema({
  id: Object,
  time: Number
}, { collection: 'stairs' });

class StairsClass {
  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }
}

StairsSchema.loadClass(StairsClass);
module.exports = mongoose.model('Stairs', StairsSchema);
