const mongoose = require('mongoose');

const AshbinSchema = new mongoose.Schema({
  id: Object,
  time: Number
}, { collection: 'ashbin' });

class AshbinClass {
  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }
}

AshbinSchema.loadClass(AshbinClass);
module.exports = mongoose.model('Ashbin', AshbinSchema);
