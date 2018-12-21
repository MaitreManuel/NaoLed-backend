const mongoose = require('mongoose');

const ValuesSchema = new mongoose.Schema({
  id: Object,
  trashOut: Number,
  trashIn: Number,
  ashbin: Number,
  stairs: Number,
  heater: Number,
  light: Number,
  time: String
}, { collection: 'values' });

class ValuesClass {
  getId() {
    return this.id;
  }

  getValues() {
    return {
      trashOut: this.trashOut,
      trashIn: this.trashIn,
      ashbin: this.ashbin,
      stairs: this.stairs,
      heater: this.heater,
      light: this.heater
    }
  }

  getTime() {
    return this.time;
  }
}

ValuesSchema.loadClass(ValuesClass);
module.exports = mongoose.model('Values', ValuesSchema);
