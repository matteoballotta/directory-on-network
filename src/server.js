const express = require('express');
const filesys = require('fs');
let directory = process.argv[2];
let hostname  = process.argv[3];
let port      = process.argv[4];

const app = express();

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/frontend/index.html`);
});

app.get('/script', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript')
  res.sendFile(`${__dirname}/frontend/script.js`);
});

app.get('/get_files', (req, res) => {
  const files = [];
  filesys.readdir(directory, (err, files) => {
    files.forEach(file => {
      files.push(file);
    });
    res.send(files);
  });

});

app.get('/download/:filename', (req, res) => {
  const FILE = req.params.filename;
  const filepath = `${directory}/${FILE}`;
  res.download(filepath);
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});