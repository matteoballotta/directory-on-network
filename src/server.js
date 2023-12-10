const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example route: Hello World
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example route: Greet a specific person
app.get('/greet/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

// Example route: Add two numbers
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  if (!num1 || !num2) {
    return res.status(400).send('Please provide both numbers');
  }

  const result = parseFloat(num1) + parseFloat(num2);
  res.send(`The sum of ${num1} and ${num2} is: ${result}`);
});

app.get('/static-page', (req, res) => {
  res.sendFile(`${__dirname}/frontend/index.html`);
});

const HOSTNAME = '127.0.0.1';
const PORT     = 8080;
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
