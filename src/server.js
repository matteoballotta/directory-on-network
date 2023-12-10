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

app.get('/style', (req, res) => {
  res.setHeader('Content-Type', 'text/css')
  res.sendFile(`${__dirname}/frontend/style.css`);
});

app.get('/get_files', (req, res) => {
  const filesArray = [];
  filesys.readdir(directory, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.error('Error: ', err);
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
  const FILE = req.params.filename;
  const filepath = `${directory}/${FILE}`;
  res.download(filepath);
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});