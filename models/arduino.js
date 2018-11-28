const mongoose = require('mongoose');

const ArduinoSchema = new mongoose.Schema({
  id: Object,
  name: String,
  type: String
}, { collection: 'arduino' });

class ArduinoClass {
  getId() {
    return this.id;
  }

  getName() {
    return this.name
  }

  getType() {
    return this.type;
  }
}

ArduinoSchema.loadClass(ArduinoClass);
module.exports = mongoose.model('Arduino', ArduinoSchema);
