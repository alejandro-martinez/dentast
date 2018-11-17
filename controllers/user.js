const express = require('express');

const router = express.Router();
const User = require('../models/user.js');

/* GET ALL UserS */
router.get('/', (req, res, next) => {
  User.find((err, users) => {
    if (err) return next(err);
    return res.json(users);
  });
});

/* GET SINGLE User BY ID */
router.get('/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return next(err);
    return res.json(user);
  });
});

/* SAVE User */
router.post('/user', (req, res, next) => {
  User.create(req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

/* UPDATE User */
router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body,
    { upsert: true, new: true, runValidators: true },
    (err, user) => {
      if (err) {
        res.status(500);
        res.send('No se pudo editar el usuario. Revisa los datos e intenta nuevamente');
      } else {
        res.status(200);
      }
      res.json(user);
    },
  );
});

/* DELETE User */
router.delete('user/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

module.exports = router;
