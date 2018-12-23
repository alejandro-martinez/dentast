const path = require('path');
const fs = require('fs');
const backup = require('mongodb-backup');
const restore = require('mongodb-restore');
const moment = require('moment');

const ROOT_FOLDER = path.dirname(require.main.filename);
const BACKUP_FOLDER = path.join(ROOT_FOLDER, '/../backups/');
const DATABASE_CONNECTION_STRING = 'mongodb://localhost/dentast';
const Backup = require('../models/backup.js');

module.exports = (router) => {
  router.post('/backup', (req, res) => {
    /* Make backup */
    const currentDate = moment().format('YYYY-MM-DD-HH:mm');
    const backupName = `${BACKUP_FOLDER}${currentDate}`;
    // Create folder
    fs.mkdirSync(backupName);
    backup({
      uri: DATABASE_CONNECTION_STRING,
      root: backupName,
      callback: (err) => {
        if (err) {
          console.log(err);
          res.status(500);
          res.json({ err });
        } else {
          // Save backup in db
          Backup.create({
            name: `${backupName}/dentast`,
            date: moment(),
          }).then(() => {
            res.status(200);
            res.json({});
          });
        }
      },
    });
  });

  router.put('/backup', (req, res) => {
    // find backup
    Backup.findOne({}, {}, { sort: { date: -1 } }).then((dbBackupFound) => {
      console.log(dbBackupFound);
      if (dbBackupFound) {
        // Check if backup folder exists
        const backupExists = fs.existsSync(dbBackupFound.name);
        console.log(dbBackupFound);
        console.log(backupExists);
        if (backupExists) {
          restore({
            uri: DATABASE_CONNECTION_STRING,
            root: dbBackupFound.name, // Read backup files from
            drop: true, // drop entire database before restore backup
            callback: (err) => {
              if (err) {
                console.log('err', err);
                res.status(500);
                res.json({ err });
              } else {
                // Update backup in db (set restoredOn date)
                Backup.findOneAndUpdate({
                  _id: req.query._id,
                }, { $set: { restoredOn: moment() } }).then(() => {
                  res.status(200);
                  res.json({});
                });
              }
            },
          });
        } else {
          res.status(404).json({ err: 'No se encontraron copias de seguridad' });
        }
      }
    });
  });

  return router;
};

