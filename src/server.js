const EXPRESS  = require('express');
const HOSTNAME = '127.0.0.1';
const PORT     = 8080;

const APP = EXPRESS();

APP.get('/', (req, res) => {
  res.sendFile(`${__dirname}/frontend/index.html`);
});

APP.get('/download/:filename', (req, res) => {
  const FILE = req.params.filename;
  const file = `${__dirname}/${FILE}`;
  res.download(file);
});

APP.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});