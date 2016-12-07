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
              console.log(util.inspect(repos))
              callback(err,repos)
          })
      },
     getUserCommits: function(accessToken,callback){
         var commitArray=[]
         github.authenticate({
             type: "oauth",
             token: accessToken
         })
         var author
         github.users.get({},function(err,user){
            author = user
            // console.log('user is %s',util.inspect(user))
            github.repos.getAll({},function(err,res){
            _.each(res,function(repo,repoKey){
                console.log('--------------------------------------------------------------------------------------------')
                console.log(util.inspect(repo))
               github.repos.getCommits({
                    owner: res[0].owner.login,
                    repo: res[0].name,
                    author: author.login
               },function(err,commits){
                       commitArray.push(commits)
                    //    console.log('--------------------------------------------------------------------------------------------')
                    //    console.log(util.inspect(commits))
               })
            })
         })
         callback(err,commitArray)
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
                          console.log(numOfCommits)
                          callback(err,numOfCommits)
                      })
                    //   console.log(util.inspect(numOfCommits))
             })
        })
    },
/*    ////////////////NOW REPLACING IT!
    getRepoCommits: function(accessToken,repo,callback){
            github.authenticate({
                type: "oauth",
                token: accessToken
            })
            github.repos.getAll({},function(err,res){
            commits=[]
            _.each(res,function(item,key){
                if(item.id ==repo){
                    github.repos.getCommits({
                         owner: res[0].owner.login,
                         repo: res[0].name,
                    },function(err,commitArray){
                        console.log(util.inspect(commit))
                        _.each(commitArray,function(commit,key){
                            if(key!= 'meta'){
                                github.repos.getCommitComment({
                                    owner:res[0].owner.login,
                                    repo: res[0].name,
                                    id: commit[0].sha
                                },function(err,comment){
                                    commits.push({
                                        id: commit.sha,
                                        author: item.name,
                                        message: comment
                                    })
                                    console.log(util.inspect(comment))
                                })
                            }
                        })
                    })
                })
                callback(err,commits)
            }
        }
    }
}
*/


getRepoCommits: function(accessToken,repo,callback){
    github.authenticate({type: "oauth", token: accessToken})
    github.repos.getAll({},function(err,res){
        _.each(res,function(item,key){
            if(key!='meta'&&item.id==repo){
                github.repos.getCommits({owner: item.owner.login,repo: item.name,
                },function(err,commitArray){
                    commits=[]
                    _.each(commitArray,function(commit,commitKey){
                        if(commitKey!='meta'){
                            commits.push({
                                id: commit.sha,
                                author: commit.commit.author.name,
                                message: commit.commit.message
                            })
                        }
                        // console.log(util.inspect(commit))
                        // console.log(commit.commit.message)
                        // console.log(commit.commit.author.name)
                    })
                    console.log(util.inspect(commits));
                    callback(err,commits);
                })
            }
        })
    })

}

}
