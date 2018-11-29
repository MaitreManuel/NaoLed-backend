const Arduino = require('../models/arduino');

module.exports = class ArduinoHelpers {
  static getByName (name, callback) {
    return Arduino.aggregate([
      { '$match': {
          'name': name
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
