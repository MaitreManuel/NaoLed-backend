require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
module.exports = io;

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

io.on('connection', () => {
  io.emit('event', 'Event example');
});

module.exports = app;
