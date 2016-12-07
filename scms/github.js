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
            //   console.log(util.inspect(res))
              callback(err,res);
          })
      },
     getUserCommits: function(accessToken,callback){
         github.authenticate({
             type: "oauth",
             token: accessToken
         });
         var author;
         github.users.get({},function(err,user){
             author = user;
            // console.log('user is %s',util.inspect(user))
            github.repos.getAll({},function(err,res){
               github.repos.getCommits({
                    owner: res[0].owner.login,
                    repo: res[0].name,
                    author: author.login
               },function(err,commits){
                    // console.log('------------------------------------------------------------------------------------')
                    // console.log('commits are %s',util.inspect(commits))
                callback(err,commits)
               })
            })
         });
     },
     getUserCommitNum: function(accessToken,callback){
             var numOfCommits=0
             github.authenticate({
                 type: "oauth",
                 token: accessToken
             })
             var author;
             github.users.get({},function(err,user){
                 author = user;
                 github.repos.getAll({},function(err,res){
                      github.repos.getCommit({
                           owner: res[0].owner.login,
                           repo: res[0].name,
                           author: author.login
                      },function(err,commit){
                          numOfCommits++
                          callback(err,res);
                      })
                    //   console.log(util.inspect(numOfCommits))
             })
        })
    }
}
