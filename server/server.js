require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index');

const isProd = process.env.NODE_ENV === 'production';
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', routes);

if (isProd) {
  app.use(express.static('client/public'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
  });
}

module.exports = app;
