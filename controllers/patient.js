const Patient = require('../models/patient.js');

module.exports = (router) => {
  /* GET ALL Patients */
  router.get('/patient', (req, res, next) => {
    Patient.find((err, patients) => {
      console.log(err);
      if (err) return next(err);
      return res.json(patients);
    }).populate('medicalCoverage');
  });

  /* GET SINGLE Patient BY ID  */
  router.get('/patient/:id', (req, res, next) => {
    Patient.findOne({ _id: req.params.id }, (err, patient) => {
      if (err) return next(err);
      return res.json(patient);
    });
  });

  /* SAVE Patient */
  router.post('/patient', (req, res, next) => {
    Patient.create(req.body, (err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  });

  /* UPDATE Patient */
  router.put('/patient/:id', (req, res) => {
    Patient.findOneAndUpdate({ _id: req.params.id }, req.body,
      { upsert: true, new: true, runValidators: true },
      (err, patient) => {
        if (err) {
          res.status(500);
          res.send('No se pudo editar el usuario. Revisa los datos e intenta nuevamente');
        } else {
          res.status(200);
        }
        res.json(patient);
      },
    );
  });

  /* DELETE Patient */
  router.delete('patient/:id', (req, res, next) => {
    Patient.findByIdAndRemove(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  });

  return router;
};

