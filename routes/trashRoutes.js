const TrashRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const trashBinHelpers = require('../helpers/trashHelpers');

const Trash = require('../models/trash');

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
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrash(result) });
      }
    });
  });

  // Get num of Trash recycled
  app.get('/getNbTrashIn', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrashIn(result) });
      }
    });
  });

  // Get num of Trash used
  app.get('/getNbTrashOut', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrashOut(result) });
      }
    });
  });

  // Get diff between Trash used and recycled
  app.get('/getNbTrashWhichNotBeSort', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbinToRecycle: trashBinHelpers.getNbTrashWhichNotBeSort(result) });
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
                    result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
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
              result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
            }
          });
        }
      }
    });
  });
};
