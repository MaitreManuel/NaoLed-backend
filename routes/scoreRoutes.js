const cron = require('node-cron');

const helpers = require('../helpers/global');
const scoreHelpers = require('../helpers/scoreHelpers');

const Score = require('../models/score');
const Values = require('../models/values');

const config = require('../config');

module.exports = app => {
  // Get actual score
  app.get('/getScore', (req, res) => {
    helpers.getLastEntry(Score, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  app.get('/getScoreDetails', (req, res) => {
    let tmp = [];
    helpers.getAll(Score, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? null : tmp.push(result);
      }
    });
    helpers.getAll(Values, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? null : tmp.push(result);
      }
    });
    tmp.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(tmp);
  });

  // CRON to match "real time" by removing 60*5 points every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    scoreHelpers.updateScore(config.TIME);
  });

  // CRON to reset total points every day
  cron.schedule('0 0 * * *', () => {
    scoreHelpers.setScore({value: config.MAXIMUM_SCORE});
  });
};
