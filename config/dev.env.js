'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKUP_FOLDER: 'backup',
  DB_URI: 'mongodb://localhost/dentast',
  es6: true,
})
