const helpers = require('../helpers/global');
const ashBinHelpers = require('../helpers/ashbinHelpers');

const Ashbin = require('../model/ashbin');

module.exports = app => {
  app.get('/getAshbins', (req, res) => {
    helpers.getAll(Ashbin, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  app.get('/getNbAshbin', (req, res) => {
    helpers.getAll(Ashbin, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: ashBinHelpers.getNbAshbin(result) });
      }
    });
  });

  app.get('/addAshbin', (req, res) => {
    ashBinHelpers.setAshbin(res);
  });
};
