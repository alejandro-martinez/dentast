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
    let pjson = require('../package.json');
    const currentVersion = pjson.version;
    git().pull(remoteUrl, 'master').then((response) => {
      if (response) {

        const insertions = _.get(response, 'summary.insertions', 0) > 0;
        const deletions = _.get(response, 'summary.deletions', 0) > 0;
        const changes = _.get(response, 'summary.changes', 0) > 0;
        const shouldUpdate = insertions || deletions || changes;
        if (shouldUpdate) {
          exec('npm run-script build', (err, stdout, stderr) => {
            if (err) {
              return res.status(500).json({ err });
            } else {
              let pjson = require('../package.json');
               currentVersion = pjson.version;
              res.status(200).json({
                updated: true,
                currentVersion,
              });
            }
          });
        } else {
            res.status(200).json({
              currentVersion,
              updated: false,
            });
        }
      }
    });
  });

  return router;
};
