// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LobbySchema = new Schema({
  title: String,
  posts: [{title:String}]
});

mongoose.model('Lobby', LobbySchema);
