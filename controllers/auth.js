const md5 = require('md5');

const User = require('../models/user.js');

module.exports = (router) => {
  router.post('/auth', (req, res, next) => {
    User.findOne({
      name: req.body.name,
      password: md5(req.body.password),
    }, (err, user) => {
      if (err || !user) return next(err);
      return res.json(user);
    });
  });

  return router;
};
