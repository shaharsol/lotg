var GitHubApi = require('github');
var github = new GitHubApi({});
var util = require('util')
module.exports = {
    getUserRepos: function(accessToken,callback){
            github.authenticate({
                type: "oauth",
                token: accessToken
            });
          github.repos.getAll({},function(err,res){
              //console.log(util.inspect(res))
              callback(err,res);
          })
      }
     getUserCommits: function(accessToken,callback){
         github.authenticate({
             type: "oauth",
             token: accessToken
         });
     }
}
