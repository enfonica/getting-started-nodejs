const messaging = require('@enfonica/messaging');
const express = require("express");
const bodyParser = require("body-parser");
const xml = require("xml");

const MessagesClient = new messaging.MessagesClient({
  keyFile: './-.json',
});

const app = express();
app.use(bodyParser.json());

// Recordings Client Example
MessagesClient.createMessage({
  parent: 'projects/-',
  message: {
    to: '-',
    from: '-',
    body: 'Hi want to play scissors paper rock? (Reply with Scissors/Paper/Rock or No)'
  }
});

app.post("/sms", (req, res) => {
  let message = ''
  let playerChoice = '';
  const t = 'Tie',
    c = 'You lose',
    p = 'You win',
    winningMap = [
      [t, c, p],
      [p, t, c],
      [c, p, t]
    ],
    choices = ["Rock", "Paper", "Scissors"];

  if (req.body.body === 'Rock') {
    playerChoice = 0
  } else if (req.body.body === 'Paper') {
    playerChoice = 1
  } else if (req.body.body === 'Scissors') {
    playerChoice = 2
  } else if (req.body.body === 'No') {
    message = 'Aww okay.'
  } else {
    message = 'Huh?'
  }

  const getComputerChoice = function () {
    return Math.floor(Math.random() * 3);
  };

  const getWinner = function (playerChoice, computerChoice) {
    return winningMap[playerChoice][computerChoice];
  };

  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  if (message !== 'Huh?' || message !== 'Aww okay.') {
    message = winner + " [Computer: " + choices[computerChoice] + ", Player: " + choices[playerChoice] + "]"
  }

  res.status(200);
  res.set('Content-Type', 'text/xml');
  res.send(xml({ response: [{ message }] }))
});

const port = 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);
