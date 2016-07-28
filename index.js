const spdy = require('spdy');
const express = require('express');
const fs = require('fs');
var app = express();
var port = 3000;

app.get('/', function(req, res){
  res.send('hello, world');
  res.end();
});

var options = {
  key: fs.readFileSync(__dirname + '/keys/server.key'),
  cert: fs.readFileSync(__dirname + '/keys/server.crt'),
  spdy: {
    protocals: ['h2', 'spdy/3.1', 'http1.1'],
    plain: false,
    'x-forwarded-for': true,
    connection: {
      windowSize: 1024*1024,
      autoSpdy31: false
    }
  }
};

var server =  spdy.createServer(options, app);
server.listen(port, function(err){
  console.log('server listening on https://localhost:%s', port);
});

