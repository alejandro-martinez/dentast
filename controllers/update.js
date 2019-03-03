const USER = 'alejandro-martinez';
const PASS = '55a5f40a09568af5f3e464f616b082a534d7a0be';
const REPO = 'github.com/alejandro-martinez/dentast.git';


const git = require('simple-git/promise');
const { exec } = require('child_process');
const remoteUrl = `https://${USER}:${PASS}@${REPO}`;

module.exports = (router) => {

  router.get('/version', (req, res, next) => {
  	var pjson = require('../package.json');
  	git().pull(remoteUrl, 'master').then((response) => {
  		if (response) {
  			console.log(response);
  			res.json({
	  			currentVersion: pjson.version,
	  			remoteVersion: response,
	  		});	
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
