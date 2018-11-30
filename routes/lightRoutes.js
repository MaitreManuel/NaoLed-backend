const LightRouter = require('express').Router();

const arduinoHelpers = require('../helpers/arduinoHelpers');
const helpers = require('../helpers/global');
const lightHelpers = require('../helpers/lightHelpers');

const Light = require('../models/light');

module.exports = app => {
  LightRouter.route('/')
    // .get((req, res) => {
    //   helpers.getAll(Light, ({ error, result }) => {
    //     if (error) {
    //       res.send(error);
    //     } else {
    //       result.length < 1 ? res.status(418).send({ 'message': 'Aucun résultat' }) : res.send(result);
    //     }
    //   });
    // })

    // .post(({body: { name, status }}, res) => {
    //   arduinoHelpers.getByName(name, ({ error, result }) => {
    //     if (error) {
    //       res.send(error);
    //     } else {
    //       if (result.length < 1) {
    //         res.status(418).send({ 'message': 'Identifiant faux' });
    //       } else {
    //         lightHelpers.setLight(status, ({ error, result }) => {
    //           if (error) {
    //             res.send(error);
    //           } else {
    //             res.send(result);
    //           }
    //         });
    //       }
    //     }
    //   })
    // })

    .get((req, res) => {
      arduinoHelpers.getByName(req.query.name, ({ error, result }) => {
        if (error) {
          res.send(error);
        } else {
          if (result.length < 1) {
            res.status(418).send({ 'message': 'Identifiant faux' });
          } else {
            lightHelpers.setLight(req.query.status, ({ error, result }) => {
              if (error) {
                res.send(error);
              } else {
                res.send(result);
              }
            });
          }
        }
      })
    })

  app.use('/lights', LightRouter);
};
