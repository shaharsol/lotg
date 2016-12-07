
var github = require('./scms/github')
var bitbucket = require('./scms/bitbucket')
var gitlab = require('./scms/gitlab')

var config;

module.exports = {

  getUserRepos: function(accessToken,callback){
    switch(config.scm){
      case 'github':
      github.getUserRepos(accessToken,callback);
      break;
      case 'bitbucket':
      bitbucket.getUserRepos(accessToken,callback);
      break;
      case 'gitlab':
      gitlab.getUserRepos(accessToken,callback);
      break;
    }
  },

  init: function(config){
    this.config = config;
  },

  getConfig: function(){
    return this.config;
  }
}
