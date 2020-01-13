const pixel = require('node-pixel');
const five = require('johnny-five');
const express = require('express');

var board = new five.Board();
var strip = null;
const app = express();

app.listen(3000, () => console.log('server working'));
app.use(express.static('public'));

board.on('ready', function() {
  console.log('arduino board ready');

  strip = new pixel.Strip({
    board: this,
    controller: 'FIRMATA',
    strips: [{ pin: 6, length: 60 }], // this is preferred form for definition
    gamma: 2.8 // set to a gamma that works nicely for WS2812
  });

  strip.on('ready', function() {
    console.log('led strip ready');
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
