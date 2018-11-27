const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const helpers = require('./helpers/global');
const ashBinHelpers = require('./helpers/ashbinHelpers');
const trashBinHelpers = require('./helpers/trashHelpers');

const Ashbin = require('./model/ashbin');
const Trash = require('./model/trash');

const PORT = process.env.PORT || 5000;
const DB_LINK = 'mongodb://127.0.0.1:27017/naoled';
const DB_OPTIONS = { useNewUrlParser: true };

mongoose.connect(DB_LINK, DB_OPTIONS);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.listen(PORT, () => {
  console.log(`Server servin' from good ol' port ${PORT}`);
});

// All Routes

app.get('/', (req, res) => {
  console.log('Route /');
  res.send('Route /');
});

// Get

// Ashbin

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

// Trash

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

// Set

app.get('/addAshbin', (req, res) => {
  ashBinHelpers.setAshbin(res);
});

app.post('/setTrashs', (req, res) => {
  // helpers.getAll(Trash, res);
});