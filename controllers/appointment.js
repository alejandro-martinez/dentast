const Appointment = require('../models/appointment.js');

module.exports = (router) => {
  /* GET ALL appointment */
  router.get('/appointment', (req, res, next) => {
    Appointment.find((err, appointments) => {
      if (err) return next(err);
      return res.json(appointments);
    });
  });

  /* SAVE appointment */
  router.post('/appointment', (req, res, next) => {
    if (!req.body._id) {
      Appointment.create(req.body, (err, post) => {
        if (err) return next(err);
        return res.json(post);
      });
    }
    res.status(200);
  });

  /* UPDATE appointment */
  router.put('/appointment/:id', (req, res) => {
    delete req.body._id;
    Appointment.findOneAndUpdate({ _id: req.params.id },
      req.body,
      { runValidators: true },
      (err, appointment) => {
        if (err) {
          res.status(500);
          res.send('No se pudo editar el turno. Revisa los datos e intenta nuevamente');
        } else {
          res.status(200);
        }
        res.json(appointment);
      },
    );
  });

  /* DELETE appointment */
  router.delete('/appointment', (req, res, next) => {
    if (req.query && req.query._id) {
      Appointment.remove({ _id: req.query._id }, (err) => {
        if (err) return next(err);
        res.json({});
      });
    } else {
      res.status(404);
    }
  });

  return router;
};

