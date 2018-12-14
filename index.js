require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
module.exports.io = io;

const helpers = require('./helpers/global');
const Ashbin = require('./models/ashbin');
const Door = require('./models/door');
const Light = require('./models/light');
const Stairs = require('./models/stairs');
const Trash = require('./models/trash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/ashbinRoutes')(app);
require('./routes/doorRoutes')(app);
require('./routes/lightRoutes')(app);
require('./routes/stairsRoutes')(app);
require('./routes/trashRoutes')(app);

const PORT = process.env.DB_PORT;
const DB_LINK = process.env.DB_HOST || process.env.MONGODB_ADDON_URI;
const DB_OPTIONS = { useNewUrlParser: true };

mongoose.connect(DB_LINK, DB_OPTIONS);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.listen(PORT, () => {
  console.log(`Server servin' from good ol' port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Route /');
});

app.get('/getAll', (req, res) => {
  const ashbinsPromise = new Promise((resolve, reject) => {
    helpers.getAll(Ashbin, ({ error, result }) => {
      if (error) {
        reject(error);
      } else {
        result.length < 1 ? reject(error) : resolve(result);
      }
    });
  });

  const doorsPromise =  new Promise((resolve, reject) => {
    helpers.getAll(Door, ({ error, result }) => {
      if (error) {
        reject(error);
      } else {
        result.length < 1 ? reject(error) : resolve(result);
      }
    });
  });
  const lightsPromise = new Promise((resolve, reject) => {
    helpers.getAll(Light, ({ error, result }) => {
      if (error) {
        reject(error);
      } else {
        result.length < 1 ? reject(error) : resolve(result);
      }
    });
  });
  const stairsPromise = new Promise((resolve, reject) => {
    helpers.getAll(Stairs, ({ error, result }) => {
      if (error) {
        reject(error);
      } else {
        result.length < 1 ? reject(error) : resolve(result);
      }
    });
  });
  const trashsPromise = new Promise((resolve, reject) => {
    helpers.getAll(Trash, ({ error, result }) => {
      if (error) {
        reject(error);
      } else {
        result.length < 1 ? reject(error) : resolve(result);
      }
    });
  });

  return Promise
    .all([ ashbinsPromise, doorsPromise, lightsPromise, stairsPromise, trashsPromise ])
    .then(([ashbins, doors, lights, stairs, trashs]) => {
      res.send({
        ashbins: ashbins,
        doors: doors,
        lights: lights,
        stairs: stairs,
        trashs: trashs
      });
    });
});

io.on('connection', () => {
  helpers.emitEvent('event', { message: 'First connection !' });
});

module.exports.app = app;
