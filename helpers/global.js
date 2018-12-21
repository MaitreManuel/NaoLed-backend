const io = require('../index').io;
const Score = require('../models/score');

module.exports = class Global {
  // Generic function for all model to get all data from a collection
  static getAll(model, callback) {
    return model.find((error, result) => {
      if (!callback) {
        return { error: error, result: result }
      }
      if (error) {
        callback({ error: error });
      } else {
        callback({ result: result });
      }
    });
  }

  // Generic function for all model to get last entry from a collection
  static getLastEntry(model, callback) {
    return model.findOne().sort({ _id : -1 }).exec((error, result) => {
      if (error) {
        callback({ error: error });
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
    let sentData = {...data, score: 1500};

    Global.getLastEntry(Score, ({ error, result }) => {
      if (error) {
        console.error(error);
      } else {
        sentData.score = result.value;
      }

      io.emit(eventName, sentData);
    });
  }
};
