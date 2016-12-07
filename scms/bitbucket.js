var bitbucket = require('bitbucket-api');
var util = require('util')
var _ = require('underscore')
var request = require('request')
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


  },
  getRepoCommits: function(accessToken,repoID,callback){
    var url =util.format( 'https://api.bitbucket.org/1.0/repositories/%s/%s/changesets?limit=10','C-Lion',repoID);

    request(url,{auth:{user: accessToken.username,pass:accessToken.password}},function(error,response,body){
      if(error){
        callback(error)
      }else if(response.statusCode > 300){
        callback(body)
      }else{
        var data = JSON.parse(body);
        var commits = [];
        _.each(data.changesets,function(commit){
          commits.push({
            id: commit.raw_node,
            message: commit.message,
            author: commit.author
          })
        })
        callback(null,commits)
      }
    })




}
}
