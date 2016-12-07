var _ = require('underscore');

module.exports = {
  
  getUserRepos: function(accessToken,callback){
    var gitlab = require('gitlab')({
      url:   'https://gitlab.com/',
      token: accessToken
    });
    var returnArray = [];
// Listing projects
    gitlab.projects.all(function(projects) {
      for (var i = 0; i < projects.length; i++){
        returnArray.push(
          {
            id : projects[i]['id'],
            name : projects[i]['name'],
            url : projects[i]['web_url'] 
          });
        }
        callback(null, returnArray);
    });
    
  } ,
  
  getRepoCommits : function(accessToken,id,callback){
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
  },
  
  commitsByUser : function(accessToken,id,userEmail, callback){
    this.listRepoCommits(accessToken, id, function(err,commits){
        callback (null, _.where(commits, {author_email: userEmail}));
      }
    )}
  }