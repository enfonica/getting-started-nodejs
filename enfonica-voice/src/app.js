const express = require('express');
require('dotenv').config();
const xml = require("xml");
const middlewares = require('./middlewares');
const app = express();
app.use(express.json());
const voice = require('@enfonica/voice');
const VoiceClient = new voice.CallsClient();

VoiceClient.createCall({
  parent: 'projects/...',
  call: {
    to: '...',
    from: '...',
    options: {
      handlerUris: ['.../handle-call']
    }
  }
});

app.post('/handle-call', (req, res) => {
  res.status(200);
  res.set('Content-Type', 'text/xml');
  res.send(xml({ response: [{ say: 'This is a test call!' }] }));
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
