const HTTP = require('node:http');

const HOSTNAME = '127.0.0.1';
const PORT     = '3000';

const SERVER = HTTP.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world!\n');
});

SERVER.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}/${PORT}/`);
});