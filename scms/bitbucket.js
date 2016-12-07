var bitbucket = require('bitbucket-api');
var util = require('util')
var _ = require('underscore')

module.exports = {
  getUserRepos: function(accessToken,callback){
    var credentials = {username: accessToken.username, password: accessToken.password};
    var client = bitbucket.createClient(credentials);

    client.repositories(function(err,repos){

      var minified = [];
      _.each(repos,function(repo){
        minified.push({
          id: repo.slug,
          name: repo.name,
          url: repo.resource_uri
        })
      })
      callback(err,minified)

    })


  }
}
