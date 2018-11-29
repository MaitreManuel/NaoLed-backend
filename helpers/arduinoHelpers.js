const Arduino = require('../models/arduino');

module.exports = class ArduinoHelpers {
  static getByName (name, callback) {
    console.log(name);
    console.log(typeof name);
    return Arduino.aggregate([
      { '$match': {
          'name': name
        }
      }
    ], (error, result) => {
      if (error) {
        callback({ error: error });
      } else {
        console.log(result);
        callback({ result: result });
      }
    });
  }

  static getByType (type, callback) {
    return Arduino.aggregate([
      { '$match': {
          'type': type
        }
      }
    ], (error, result) => {
      if (error) {
        callback({ error: error });
      } else {
        callback({ result: result });
      }
    });
  }
};
