var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('post', function(data, fn){
    var lobby = data.lobby,
      message = data.msg;

    Lobby.update({id:lobby}, {$addToSet: {message:message}}, function(err){
      if(!err){
        socket.emit('message', {lobby:lobby, message:message});
      }
    });
  });
});

require('./config/express')(app, config);

app.listen(config.port);
