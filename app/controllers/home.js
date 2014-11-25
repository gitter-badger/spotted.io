var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Lobby = mongoose.model('Lobby');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', home);
router.get('/lobby/:id', getLobby);
router.post('/lobby', addLobby);

function home(req, res, next) {
  res.send(200);
}

function addLobby(req, res, next){
  var title = req.param('title');

  Lobby.insert({title:title}, function(err){
    if(err) res.send(400,err);
    else res.send(200);
  })
}

function getLobby(req, res, next) {
  var id = req.param('id');

  Lobby.findOne({id:id}, function(err, lobby){
    if(err) res.send(400,err);
    else if(lobby) res.send(200,lobby);
    else res.send(404);
  })
}
