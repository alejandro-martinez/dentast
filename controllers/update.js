const System = require('../models/system.js');
const _ = require('lodash');
const USER = 'alejandro-martinez';
const PASS = '55a5f40a09568af5f3e464f616b082a534d7a0be';
const REPO = 'github.com/alejandro-martinez/dentast.git';

const fs = require('fs');
const git = require('simple-git/promise');
const path = require('path');
const { exec } = require('child_process');
const remoteUrl = `https://${USER}:${PASS}@${REPO}`;

module.exports = (router) => {

  router.post('/update', (req, res, next) => {
  	const pjson = require('../package.json');
    const currentVersion = pjson.version;
  	git().pull(remoteUrl, 'master').then((response) => {
  		if (response) {
        exec('npm run-script build', (err, stdout, stderr) => {
          if (err) {
            return res.status(500).json({ err });
          } else {
            res.status(200).end();
          }
        });
  		}
  	});
  });

  return router;
};
