const REPO = 'github.com/alejandro-martinez/dentast.git';

const fs = require('fs');
const git = require('simple-git/promise');
const { exec } = require('child_process');

const remoteUrl = `https://${REPO}`;
const pjson = require('../package.json');

module.exports = (router) => {
  router.post('/update', (req, res) => {
    const version = pjson.version;
    git().pull(remoteUrl, 'master').then((response) => {
      if (response && response.summary.changes > 1) {
        exec('npm run-script build', (err) => {
          if (err) {
            return res.status(500).json({ err });
          }
          const pjson2 = JSON.parse(fs.readFileSync('./package.json'));
          res.status(200).json({
            updated: true,
            version: pjson2.version,
          });
        });
      }
    }).catch(() => {
      res.status(200).json({
        version,
        updated: false,
      });
    });
  });

  return router;
};
