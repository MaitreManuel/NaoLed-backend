const Stairs = require('../models/ashbin');

module.exports = class StairsHelpers {
  static getStairsAverage (result) {
    return result.filter(e => e.time > Math.floor((new Date().getTime() / 1000)) - 3600 );
  }

  static getNbStairs(result) {
    return result.length;
  }

  static setStairs(callback) {
    Stairs.create({
      time: new Date().getTime()
    }, (error, result) => {
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
      }
    });
  }
};
