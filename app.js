const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).json({ id: '01', content: 'hello from 1st API' });
});

app.post('/', (req, res) => {
  res.send('you have successfully posted to this URL endpoint');
});

app.get('/files', (req, res) => {
  res.sendFile(path.join(__dirname, 'tour.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  let data = JSON.stringify(req.body);
  fs.writeFile('formData.txt', data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing to file');
    } else {
      res.status(200).json(({ name, email } = data));
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
});
