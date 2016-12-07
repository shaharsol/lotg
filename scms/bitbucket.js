var bitbucket = require('bitbucket-api');
var util = require('util')
var _ = require('underscore')

module.exports = {
  getUserRepos: function(accessToken,callback){
    var credentials = {username: accessToken.username, password: accessToken.password};
    var client = bitbucket.createClient(credentials);

    client.repositories(function(err,repos){
      console.log(util.inspect(repos))

      var minified = [];
      _.each(repos,function(repo){
        minified.push({
          id: repo.name,
          name: repo.slug,
          url: resource_uri
        })
      })
      console.log(util.inspect(minified))
      callback(err,minified)

    })


  }
}
