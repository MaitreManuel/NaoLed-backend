const io = require('../index').io

module.exports = class Global {
  // Generic function for all model to get all data from a collection
  static getAll(model, callback) {
    return model.find((error, result) => {
      if (!callback) {
        return { error: error, result: result }
      }
      if (error) {
        callback({ error: error});
      } else {
        callback({ result: result });
      }
    });
  }

  // Get all entries between two dates
  static fromTo(model, options, callback) {
    return model.aggregate([
      { '$match': {
          'time': { '$gte': parseInt(options.from), '$lt': parseInt(options.to) }
        }
      }
    ], (error, result) => {
      if (error) {
        calback({ error: error });
      } else {
        callback({ result: result });
      }
    });
  }

  static emitEvent (eventName, data) {
    const sentData = {...data, score: Global.getGlobalScore()};

    io.emit(eventName, sentData);
  }

  static getGlobalScore () {
    return 1500;
  }
};
