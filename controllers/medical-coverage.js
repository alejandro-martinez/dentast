const MedicalCoverage = require('../models/medical-coverage.js');

module.exports = (router) => {
  /* GET ALL UserS */
  router.get('/medical-coverage', (req, res, next) => {
    MedicalCoverage.find((err, medicalCoverages) => {
      console.log(err);
      if (err) return next(err);
      return res.json(medicalCoverages);
    });
  });

  /* GET SINGLE User BY ID  */
  router.get('/medical-coverage/:id', (req, res, next) => {
    MedicalCoverage.findOne({ _id: req.params.id }, (err, medicalCoverages) => {
      if (err) return next(err);
      return res.json(medicalCoverages);
    });
  });

  /* SAVE User */
  router.post('/medical-coverage', (req, res, next) => {
    MedicalCoverage.create(req.body, (err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  });

  /* UPDATE User */
  router.put('/medical-coverage/:id', (req, res) => {
    MedicalCoverage.findOneAndUpdate({ _id: req.params.id }, req.body,
      { upsert: true, new: true, runValidators: true },
      (err, medicalCoverage) => {
        if (err) {
          res.status(500);
          res.send('No se pudo editar el usuario. Revisa los datos e intenta nuevamente');
        } else {
          res.status(200);
        }
        res.json(medicalCoverage);
      },
    );
  });

  /* DELETE User */
  router.delete('medical-coverage/:id', (req, res, next) => {
    MedicalCoverage.findByIdAndRemove(req.params.id, req.body, (err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
  });

  return router;
};

