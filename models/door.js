const mongoose = require('mongoose');

const DoorSchema = new mongoose.Schema({
  id: Object,
  time_open: Number,
  time_closed: Number
}, { collection: 'door' });

class DoorClass {
  getId() {
    return this.id;
  }

  getTimeOpen() {
    return this.time_open;
  }

  getTimeClosed() {
    return this.time_closed;
  }
}

DoorSchema.loadClass(DoorClass);
module.exports = mongoose.model('Door', DoorSchema);
