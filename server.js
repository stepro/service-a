var os = require('os');
var express = require('express');
var request = require('request');
var contextful = require('./contextful');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', function (req, res) {
    request({
        uri: 'http://service-b',
        headers: contextful.from(req)
    }, function (error, response, body) {
        res.send('Hello from service A running on ' + os.hostname() + ' and ' + body);
    });
});

var port = 80;
var server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});

process.on("SIGINT", () => {
    process.exit(130 /* 128 + SIGINT */);
});

process.on("SIGTERM", () => {
    console.log("Terminating...");
    server.close();
});
