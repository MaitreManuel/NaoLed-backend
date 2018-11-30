const DoorRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const doorHelpers = require('../helpers/doorHelpers');

const Door = require('../models/door');

module.exports = app => {
  DoorRouter.route('/')
    .get((req, res) => {
      helpers.getAll(Door, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
        }
      });
    })

    .post(({ body: { name, status } }, res) => {
      arduinoHelpers.getByName(name, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          if (result.length < 1) {
            res.status(418).send({ 'message': 'Identifiant faux' });
          } else {
            doorHelpers.setDoor(status, ({ error, result }) => {
              if (error) {
                res.send(error);
              } else {
                res.send(result);
                helpers.emitEvent('ashbinAdd', result);
              }
            });
          }
        }
      })
    })

  app.use('/doors', DoorRouter);
};
