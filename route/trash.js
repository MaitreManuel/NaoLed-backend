const helpers = require('../helpers/global');
const trashBinHelpers = require('../helpers/trashHelpers');

const Trash = require('../model/trash');

module.exports = app => {
  app.get('/getTrashs', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send(result);
      }
    });
  });

  app.get('/getNbTrash', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrash(result) });
      }
    });
  });

  app.get('/getNbTrashIn', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrashIn(result) });
      }
    });
  });

  app.get('/getNbTrashOut', (req, res) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        res.send(error);
      } else {
        result.length < 1 ? res.send({ 'message': 'Aucun résultat' }) : res.send({ nbAshbin: trashBinHelpers.getNbTrashOut(result) });
      }
    });
  });

  app.post('/setTrashIn', (req, res) => {
    // helpers.getAll(Trash, res);
  });

  app.post('/setTrashIn', (req, res) => {
    // helpers.getAll(Trash, res);
  });
};
