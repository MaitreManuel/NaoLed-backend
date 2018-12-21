const TrashRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const trashBinHelpers = require('../helpers/trashHelpers');
const scoreHelpers = require('../helpers/scoreHelpers');
const Trash = require('../models/trash');

const config = require('../config');

module.exports = app => {
  // Get historic of trash used and recycled
  app.get('/getTrashs', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  // Get num of action with Trash
  app.get('/getNbTrash', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbTrash: trashBinHelpers.getNbTrash(result) });
      }
    });
  });

  // Get num of Trash recycled
  app.get('/getNbTrashIn', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbTrash: trashBinHelpers.getNbTrashIn(result) });
      }
    });
  });

  // Get num of Trash used
  app.get('/getNbTrashOut', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbTrash: trashBinHelpers.getNbTrashOut(result) });
      }
    });
  });

  // Get diff between Trash used and recycled
  app.get('/getNbTrashWhichNotBeSort', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbTrashToRecycle: trashBinHelpers.getNbTrashWhichNotBeSort(result) });
      }
    });
  });

  // Add a Trash recycled
  app.post('/setTrashIn', (req, res) => {
    arduinoHelpers.getByName(req.body.name, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        if (result.length < 1) {
          res.status(418).send({ 'message': 'Identifiant faux' });
        } else {
          helpers.getAll(Trash, ({ error, result }) => {
            if (error) {
              res.send(error);
            } else {
              let nbAshbin = trashBinHelpers.getNbTrashWhichNotBeSort(result);

              if (nbAshbin < 1) {
                res.status(418).send({ 'message': 'All trashs are already recycled' });
              } else {
                trashBinHelpers.setTrash({ type: 1 }, ({ error, result }) => {
                  if (error) {
                    res.send(error);
                  } else {
                    if (result.length < 1) {
                      return res.status(418).send({ 'message': 'Aucun résultat' });
                    }
                    scoreHelpers.updateScore(config.COFFEE_RECYCLED);
                    res.send(result);
                    helpers.emitEvent('trashIn', result);
                  }
                });
              }
            }
          });
        }
      }
    });
  });

  // Add a Trash used
  app.post('/setTrashOut', (req, res) => {
    arduinoHelpers.getByName(req.body.name, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        if (result.length < 1) {
          res.status(418).send({ 'message': 'Identifiant faux' });
        } else {
          trashBinHelpers.setTrash({ type: 0 }, ({ error, result }) => {
            if (error) {
              res.send(error);
            } else {
              if (result.length < 1) {
                return res.status(418).send({ 'message': 'Aucun résultat' });
              }
              scoreHelpers.updateScore(config.COFFEE_USED);
              res.send(result);
              helpers.emitEvent('trashOut', result);
            }
          });
        }
      }
    });
  });
};
