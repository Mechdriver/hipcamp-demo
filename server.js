const _ = require('lodash');
const http = require('http');
const express = require('express');

const features = require('./app/static/campFeatures.js');

const app = express();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/templates/campGround.html');
});

app.get('/camp-features/', (req, res) => {
    res.send(JSON.stringify(features));
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});