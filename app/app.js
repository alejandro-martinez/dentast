const express = require('express');

const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const cors = require('cors');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/dentast', {
  promiseLibrary: bluebird,
})
  .then(() => {
    console.log('Connected to dentast DB');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Load routes
require('../controllers/patient')(app);
require('../controllers/auth')(app);
require('../controllers/medical-coverage')(app);
require('../controllers/appointment')(app);
require('../controllers/backup')(app);

module.exports = app;
