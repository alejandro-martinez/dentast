const System = require('../models/system.js');
const _ = require('lodash');
const USER = 'alejandro-martinez';
const PASS = '55a5f40a09568af5f3e464f616b082a534d7a0be';
const REPO = 'github.com/alejandro-martinez/dentast.git';


const git = require('simple-git/promise');
const { exec } = require('child_process');
const remoteUrl = `https://${USER}:${PASS}@${REPO}`;

module.exports = (router) => {

  router.get('/version', (req, res, next) => {
  	const pjson = require('../package.json');
    const currentVersion = pjson.version;
  	git().pull(remoteUrl, 'master').then((response) => {
  		if (response) {
        const insertions = _.get(response, 'summary.insertions', 0) > 0;
        const deletions = _.get(response, 'summary.deletions', 0) > 0;
        const changes = _.get(response, 'summary.changes', 0) > 0;
  			const shouldUpdate = insertions || deletions || changes;
        if (shouldUpdate) {
          // Mark system as it should be updated
          System.findOneAndUpdate({ version: currentVersion }, {
            outdated: true,
          }, (err) => {
          if (err) return next(err);
            const newVersion = require('../package.json');
            res.json({
              currentVersion,
              remoteVersion: newVersion.version,
            });
          }); 
        }
  		}
  	}).catch(() => {
  		res.json({
  			currentVersion: pjson.version,
  		});
  	})
  });


  router.post('/update', (req, res, next) => {
  	git().pull(remoteUrl, 'master').then((response) => {
  		if (response && response.summary.changes > 0 || response.summary.insertions > 0) {
			exec('npm run-script build', (err, stdout, stderr) => {
			  if (err) {
  				return res.status(500).json({ err });
  			  } else {
    		  // Mark system as updated
          const pjson = require('../package.json');
          const currentVersion = pjson.version;
    
          System.findOneAndUpdate({ version: currentVersion }, {
            outdated: false,
          });
            res.status(200).end();
  			  }
			});
  		} else {
  			res.status(200).end();
  		}
  	});
  });

  return router;
};
