const StairsRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const stairsHelpers = require('../helpers/stairsHelpers');
const scoreHelpers = require('../helpers/scoreHelpers');
const Stairs = require('../models/stairs');

const config = require('../config');

module.exports = app => {
  // Get historic of people who walks in stairs
  StairsRouter.route('/')
    .get((req, res) => {
      helpers.getAll(Stairs, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
        }
      });
    })
    // Add entry when people walks in sstairs
    .post((req, res) => {
      arduinoHelpers.getByName(req.body.name, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          if (result.length < 1) {
            res.status(418).send({ 'message': 'Identifiant faux' });
          } else {
            stairsHelpers.setStairs(({ error, result }) => {
              if (error) {
                res.send(error);
              } else {
                if (result.length < 1) {
                  res.send({ 'message': 'Aucun résultat' });
                }
                res.send(result);
                helpers.emitEvent('stairsAdd', result);
                scoreHelpers.updateScore(config.STAIRS);
              }
            });
          }
        }
      });
    })
  ;

  // Get the amount of people who walks in stairs
  app.get('/getNbStairs', (req, res) => {
    helpers.getAll(Stairs, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbStairs: stairsHelpers.getNbStairs(result) });
      }
    });
  });

  // Get historic of people who walks in stairs between two dates
  app.get('/getStairsFromTo', (req, res) => {
    if (!req.query.to) {
      req.query.to = new Date().getTime();
    }
    helpers.fromTo(Stairs, { from: req.query.from, to: req.query.to },({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  app.use('/stairs', StairsRouter);
};
