'use strict';
const path = require('path');
const express = require('express');
const app = express();

app.use("/public", express.static('./public'));


app.get('/', (req, res) => {
  	res.sendFile(path.join(__dirname + '/views/chat.html'));
});

app.get('/data', (req, res) => {

});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  	console.log(`App listening on port ${PORT}`);
  	console.log('Press Ctrl+C to quit.');
});

module.exports = app;
