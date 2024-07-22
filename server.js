const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let users = require('./fake_person_data.json');

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  fs.writeFileSync('./fake_person_data.json', JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
});

app.put('/users/:index', (req, res) => {
  const index = req.params.index;
  users[index] = req.body;
  fs.writeFileSync('./fake_person_data.json', JSON.stringify(users, null, 2));
  res.json(users[index]);
});

app.delete('/users/:index', (req, res) => {
  const index = req.params.index;
  users.splice(index, 1);
  fs.writeFileSync('./fake_person_data.json', JSON.stringify(users, null, 2));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
