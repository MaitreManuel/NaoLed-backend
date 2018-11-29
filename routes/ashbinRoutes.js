const AshbinRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const ashBinHelpers = require('../helpers/ashbinHelpers');

const Ashbin = require('../models/ashbin');

module.exports = app => {
  // Get historic of fags thrown in ashbin
  app.get('/getAshbins', (req, res) => {
    helpers.getAll(Ashbin, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  // Get the amount of fags put in ashbin
  app.get('/getNbAshbin', (req, res) => {
    helpers.getAll(Ashbin, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: ashBinHelpers.getNbAshbin(result) });
      }
    });
  });

  // Get historic of fags thrown in ashbin between two dates
  app.get('/getAshbinsFromTo', (req, res) => {
    if (!req.query.to) {
      req.query.to = new Date().getTime();
    }
    helpers.fromTo(Ashbin, { from: req.query.from, to: req.query.to },({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  // Add entry when fag is thrown in ashbin
  AshbinRouter.route('/')
    .post((req, res) => {
      arduinoHelpers.getByName(req.body.name, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          if (result.length < 1) {
            res.status(418).send({ 'message': 'Identifiant faux' });
          } else {
            ashBinHelpers.setAshbin(({ error, result }) => {
              if (error) {
                res.send(error);
              } else {
                result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send(result);
              }
            });
          }
        }
      });
    })
  ;

  app.use('/addAshbin', AshbinRouter);
};
