module.exports = {
  
  getUserRepos: function(accessToken,callback){
    var gitlab = require('gitlab')({
      url:   'https://gitlab.com/',
      token: accessToken
    });

// Listing projects
    gitlab.projects.all(function(projects) {callback(null,projects)});},
  
    
  listRepoCommits : function(accessToken,id,callback){
    var url = 'https://gitlab.com/';
    var request = require('request');
    var gitlab = require('gitlab')({
      url:   url,
      token: accessToken
    });
    
    // Listing commits
    var getPath = url + 'api/v3/projects/' + id + '/repository/commits?private_token=' + accessToken;
    request(getPath, function (error, response, body) {
      if (error){callback(error)}
        if (!error && response.statusCode < 400) 
          {callback(null,JSON.parse(body))}
      else {callback(null,response)}
    })
}}