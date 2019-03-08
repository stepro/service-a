var os = require('os');
var express = require('express');
var request = require('request');

var app = express();
app.use(express.static(__dirname + '/public'));
var cache = null;
// cache = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASSWORD
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api', function (req, res) {
    if (cache) {
        cache.incr('requestCount');
    }
    // request({
    //     uri: 'http://' + process.env.SERVICE_B_HOST,
    // }, function (error, response, body) {
        res.send('Hello from service A on ' + os.hostname());
    // });
});

app.get('/metrics', function (req, res) {
    if (!cache) {
        res.send({ requestCount: -1 });
    } else {
        cache.get('requestCount', function (err, reply) {
            res.send({ requestCount: reply });
        });
    }
});

var port = process.env.PORT || 3000;
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
