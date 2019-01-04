const _ = require('lodash');
const moment = require('moment');
const path = require('path');
const zip = require('express-zip');
const unzip = require('unzip');
const fs = require('fs');
const rimraf = require('rimraf');
// For receiving file uploads
const formidable = require('formidable');

const DBBackup = require('backup-mongodb');
const DBRestore = require('backup-mongodb-restorer');

const BACKUP_FOLDER = path.join(__dirname, '../backups/');
const DATABASE_CONNECTION_STRING = 'mongodb://localhost/dentast';

const isDirectory = source => fs.lstatSync(source).isDirectory();

const isFile = source => fs.lstatSync(source).isFile();

const getFolderContents = source => fs.readdirSync(source).map(name => path.join(source, name));

const getDirectories = source => getFolderContents(source).filter(isDirectory);

const getFilesFromFolder = source => getFolderContents(source).filter(isFile);

module.exports = (router) => {
  // Get available zip backups
  router.get('/backup', (req, res) => {
    let backups = [];
    try {
      backups = getDirectories(BACKUP_FOLDER);
      const backupList = [];
      if (backups) {
        backups.forEach((backupFolder) => {
          const folderFiles = getFilesFromFolder(backupFolder);
          // Filter zip files
          const backupZipFile = folderFiles.find(file => file.match('.zip'));
          backupList.push({ name: backupZipFile });
        });
      }
      return res.json(backupList);
    } catch (err) {
      return res.json([]);
    }
  });

  router.get('/backup/download/:name', (req, res) => {
    const zipFilename = req.params.name;
    const zipContainer = zipFilename.replace('.zip', '');
    const zipSourcePath = path.join(BACKUP_FOLDER, zipContainer, zipFilename);
    res.zip([
      { path: zipSourcePath, name: zipFilename },
    ]);
  });

  // Delete backup folder
  router.delete('/backup', (req, res) => {
    const backups = getDirectories(BACKUP_FOLDER);
    if (_.get(req, 'query.name')) {
      const backupFolder = req.query.name.replace('.zip', '');
      const backupForDeletion = backups.find(name => name.match(backupFolder));

      if (backupForDeletion) {
        try {
          rimraf(backupForDeletion, () => {
            res.status(200).end();
          });
        } catch (err) {
          return res.status(500).json({ err });
        }
      }
    }
    return res.status(404);
  });

  router.post('/backup/import', (req, res) => {
    // Unzip backup to backup folder
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, fileUploaded) => {
      if (err) {
        res.status(500).json({ err: `Ocurrio un error al subir la copia de seguridad: ${err}` });
      }
      if (_.get(fileUploaded, 'file')) {
        const dateName = moment().format('DD_MM_YY.HH.mm.ss');
        const outputBackupFolder = `dentast_${dateName}`;
        const backupOutputFolder = path.join(BACKUP_FOLDER, outputBackupFolder);
        fs.mkdirSync(backupOutputFolder);
        fs.createReadStream(fileUploaded.file.path).pipe(unzip.Extract({ path: backupOutputFolder }));
        res.status(200).end();
      }
    });
  });

  router.post('/backup', (req, res) => {
    const backupInstance = new DBBackup(DATABASE_CONNECTION_STRING, BACKUP_FOLDER);
    backupInstance.backup((err) => {
      if (err) {
        res.status(500);
        res.json({ err });
      } else {
        res.status(200).end();
      }
    });
  });

  router.put('/backup', (req, res) => {
    const useObjectID = true;
    const backupFolder = req.body.name.replace('.zip', '');
    const zipFilePath = path.join(BACKUP_FOLDER, backupFolder, req.body.name);
    const restoreInstance = new DBRestore(DATABASE_CONNECTION_STRING, zipFilePath, useObjectID);
    restoreInstance.restore((err) => {
      if (err) {
        res.status(500);
        res.json({ err });
      } else {
        res.status(200);
        res.json({});
      }
    });
  });

  return router;
};

