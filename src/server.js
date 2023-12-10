const express = require('express');
const filesys = require('fs');
const logger  = require('./utils/logger');
let directory = process.argv[2] || './';
let hostname  = process.argv[3] || '127.0.0.1';
let port      = process.argv[4] || 3000;

const app = express();

app.get('/', (req, res) => {
  logger.log(logger.log_level.INFO, `${req.ip} connected to the server`);
  res.sendFile(`${__dirname}/frontend/index.html`);
});

app.get('/script', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(`${__dirname}/frontend/script.js`);
});

app.get('/style', (req, res) => {
  res.setHeader('Content-Type', 'text/css')
  res.sendFile(`${__dirname}/frontend/style.css`);
});

app.get('/get_files', (req, res) => {
  const filesArray = [];
  filesys.readdir(directory, {withFileTypes: true}, (err, files) => {
    if(err) {
      logger.log(log.log_level.ERROR, err.message);
      return;
    }

    const noDir = files
      .filter(file => file.isFile())
      .map(file => file.name);

    noDir.forEach(file => {
      filesArray.push(file);
    });
    res.send(filesArray);
  });
});

app.get('/download/:filename', (req, res) => {
  const file = req.params.filename;
  if(file.includes('/')) {
    logger.log(logger.log_level.WARNING, `${req.ip} tried to access a different folder! (Blocked)`);
    return;
  }
  logger.log(logger.log_level.INFO, `${req.ip} downloaded ${file}`);
  const filepath = `${directory}/${file}`;
  res.download(filepath);
});

app.listen(port, hostname, () => {
  logger.log(logger.log_level.INFO, `Server is running on http://${hostname}:${port}`);
});