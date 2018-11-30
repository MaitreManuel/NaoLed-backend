const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({
  id: Object,
  time_light_on: Number,
  time_light_off: Number
}, { collection: 'light' });

class LightClass {
  getId() {
    return this.id;
  }

  getTimeLightOn() {
    return this.time_light_on;
  }

  getTimeLightOff() {
    return this.time_light_off;
  }
}

LightSchema.loadClass(LightClass);
module.exports = mongoose.model('Light', LightSchema);
