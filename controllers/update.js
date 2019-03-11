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
        console.log('about to update');
        return exec('npm run-script build', (err) => {
          if (err) {
            return res.status(500).json({ err });
          }
          return fs.readFile('./package.json', (pjson2) => {
            console.log(pjson2);
            const packageJson = JSON.parse(pjson2);
            res.status(200).json({
              updated: true,
              version: packageJson.version,
            });
          });
        });
      }
      return res.status(200).json({
        updated: false,
        version,
      });
    }).catch(() => {
      res.status(200).json({
        version,
        updated: false,
      });
    });
  });

  return router;
};
