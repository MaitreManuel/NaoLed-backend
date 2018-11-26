const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
// const DB_LINK = '';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  console.log('Route /');
  res.send('Route /');
});

server.listen(PORT, () => {
  console.log(`Server servin' from good ol' port ${PORT}`);
});
