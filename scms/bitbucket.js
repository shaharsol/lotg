var bitbucket = require('bitbucket-api');
var util = require('util')

module.exports = {
  getUserRepos: function(accessToken,callback){
    var credentials = {username: accessToken.username, password: accessToken.password};
    var client = bitbucket.createClient(credentials);

    client.repositories(function(err,repos){
      console.log(util.inspect(repos))
      callback(err,repos)
    })


  }
}
