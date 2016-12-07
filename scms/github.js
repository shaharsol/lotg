var GitHubApi = require('github')
var github = new GitHubApi({})
var util = require('util')
var _ = require('underscore')
module.exports = {
    getUserRepos: function(accessToken,callback){
            github.authenticate({
                type: "oauth",
                token: accessToken
            })
          github.repos.getAll({},function(err,res){
              var repos = []
              _.each(res,function(item,key){
                  if(key != 'meta'){
                      repos.push({
                          id: item.id,
                          name: item.name,
                          url: item.html_url
                      })
                  }
              })
              //console.log(util.inspect(repos))
              callback(err,repos)
          })
      },
     getUserCommits: function(accessToken,callback){
         github.authenticate({
             type: "oauth",
             token: accessToken
         })
         var author
         github.users.get({},function(err,user){
             author = user
            // console.log('user is %s',util.inspect(user))
            github.repos.getAll({},function(err,res){
               github.repos.getCommits({
                    owner: res[0].owner.login,
                    repo: res[0].name,
                    author: author.login
               },function(err,commits){
                    // console.log('------------------------------------------------------------------------------------')
                     console.log(util.inspect(commits))
                    callback(err,commits)
               })
            })
         })
     },
     getUserCommitNum: function(accessToken,callback){
             var numOfCommits=0
             github.authenticate({
                 type: "oauth",
                 token: accessToken
             })
             var author
             github.users.get({},function(err,user){
                 author = user
                 github.repos.getAll({},function(err,res){
                     //console.log(util.inspect(res))
                      github.repos.getCommits({
                           owner: res[0].owner.login,
                           repo: res[0].name,
                           author: author.login
                      },function(err,commit){
                          _.each(commit,function(item,key){
                              if(key!='meta')
                                numOfCommits++
                          })
                          //conosle.log()
                          console.log(numOfCommits)
                          callback(err,numOfCommits)
                      })
                    //   console.log(util.inspect(numOfCommits))
             })
        })
    }
}
