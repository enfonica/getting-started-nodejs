const express = require('express');
require('dotenv').config();
const middlewares = require('./middlewares');
const app = express();
app.use(express.json());
const messaging = require('@enfonica/messaging');
const MessagesClient = new messaging.MessagesClient();

MessagesClient.createMessage({
  parent: 'projects/...',
  message: {
    to: '...',
    from: '...',
    body: '...'
  }
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

app.get('/list', (req, res) => {
  MessagesClient.listMessages({
    parent: 'projects/...'
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
