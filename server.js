// server.js

// init project
var express = require('express');
var app = express();
var http = require('http');
var parser = require('ua-parser-js');
app.enable('trust proxy');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/whoami", function (request, response) {
  // https://ramiel-request-header.glitch.me/whoami
  response.writeHead(200, { 'Content-Type': 'application/json' });
  let userInfo = parser(request.headers['user-agent']);
  let userlang = request.headers['accept-language'].split(",");
  let browser = userInfo.browser.name;
  let device = userInfo.device.model;
  let userOS = userInfo.os.name;
  let userIP= request.ip;
  let result = {'browser': browser, 'os': userOS, 'device': device, 'language': userlang[0], 'ip': userIP};
  // response.end(JSON.stringify(userlang[0]))
  response.end(JSON.stringify(result));
 
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
