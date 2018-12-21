const Score = require('../models/score');
const Values = require('../models/values');

const config = require('../config');

module.exports = class ScoreHelpers {

    static setScore(options) {
      return Score.create({
        time: new Date().getTime(),
        value: options.value
      });
    }

    static updateScore(type) {
      let old = 0;
      ScoreHelpers.getLastEntry(Score, ({ error, result }) => {
        if(error){
          return 0;
        }
        old = result.value;
        let newScore = config.SCORE_VALUES[type] + old;

        if(newScore <= config.MAXIMUM_SCORE && newScore >= config.MINIMUM_SCORE) {
          ScoreHelpers.setScore({value: newScore});
        }
      });

    }

    static transformValues(type, score) {
      switch(type){
        case config.DOOR_OPEN: score *= 15; break;
        case config.LIGHT_ON: score *= 10; break;
      };

      return score;
    }

    static setValues(options) {
      return Values.create({
        trashOut: options.trashOut,
        trashIn: options.trashIn,
        ashbin: options.ashbin,
        stairs: options.stairs,
        heater: options.heater,
        light: options.light,
        time: new Date().getTime()
      });
    }

    static updateValues(val) {
      let old = {trashOut: 0, trashIn: 0, ashbin: 0, stairs: 0, heater: 0, light: 0};

      ScoreHelpers.getLastEntry(Values, ({ error, result }) => {
        if(error){
          return 0;
        }

        old = result;

        const newScore = {
          trashOut: old.trashOut + val.trashOut,
          trashIn: old.trashIn + val.trashIn,
          ashbin: old.ashbin + val.ashbin,
          stairs: old.stairs + val.stairs,
          heater: old.heater + ScoreHelpers.transformValues(config.DOOR_OPEN, val.heater),
          light: old.light + ScoreHelpers.transformValues(config.LIGHT_ON, val.light)
        };

        ScoreHelpers.setValues(newScore);
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

}
