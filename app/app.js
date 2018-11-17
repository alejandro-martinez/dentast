const express = require('express');
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
    console.log('connection succesful');
  })
  .catch((err) => {
    console.error(err);
  });

const user = require('../controllers/user');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Users
app.use('/user', user);


module.exports = app;
