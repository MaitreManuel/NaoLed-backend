const Ashbin = require('../model/ashbin');

module.exports = class AshBinHelpers {
  static getAshBinAverage (result) {
    return result.filter(e => e.time > Math.floor((new Date().getTime() / 1000)) - 3600 );
  }

  static getNbAshbin(result) {
    return result.length;
  }

  static setAshbin() {
    Ashbin.create({
      time: new Date().getTime()
    }, (error, result) => {
      error ? res.send(error) : res.send(result);
    });
  }
}