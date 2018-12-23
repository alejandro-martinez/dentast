const Patient = require('../models/patient.js');

module.exports = (router) => {
  /* GET ALL Patients */
  router.get('/patient', (req, res, next) => {
    Patient.find((err, patients) => {
      console.log(err);
      if (err) return next(err);
      return res.json(patients);
    }).limit(req.params.limit).populate('medicalCoverage');
  });

  /* Search Patients */
  router.get('/patient/search/:searchTerm', (req, res, next) => {
    if (req.params.searchTerm) {
      const nameRegexp = new RegExp(req.params.searchTerm, 'i');
      Patient.find({ name: nameRegexp }, (err, patients) => {
        if (err) return next(err);
        return res.json(patients);
      }).populate('medicalCoverage');
    } else {
      Patient.find((err, patients) => {
        if (err) return next(err);
        return res.json(patients);
      }).populate('medicalCoverage');
    }
  });

  /* GET SINGLE Patient BY ID  */
  router.get('/patient/:id', (req, res, next) => {
    Patient.findOne({ _id: req.params.id }, (err, patient) => {
      if (err) return next(err);
      return res.json(patient);
    });
  });

  /* SAVE Patient */
  router.post('/patient', (req, res) => {
    Patient.create(req.body, (err, post) => {
      if (err) {
        res.status(500);
        return res.json('Error al crear paciente');
      }
      return res.json(post);
    });
  });

  /* UPDATE Patient */
  router.put('/patient/:id', (req, res) => {
    Patient.findOneAndUpdate({ _id: req.params.id }, req.body,
      { runValidators: true },
      (err, patient) => {
        if (err) {
          res.status(500);
          res.send({ err });
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
