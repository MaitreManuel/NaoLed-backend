const mongoose = require('mongoose');

const TrashSchema = new mongoose.Schema({
  id: Object,
  time: Number,
  type: Number
}, { collection: 'trash' });

class TrashClass {
  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }

  getType() {
    return this.type;
  }
}

TrashSchema.loadClass(TrashClass);
module.exports = mongoose.model('Trash', TrashSchema);