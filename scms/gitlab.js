module.exports = {
  getUserRepos: function(accessToken,callback){
    var gitlab = require('gitlab')({
      url:   'https://gitlab.com/',
      token: accessToken
    });

// Listing projects
    gitlab.projects.all(function(projects) {
      // for (var i = 0; i < projects.length; i++) {
      //   console.log("#" + projects[i].id + ": " + projects[i].name + ", path: " + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: " + projects[i]["private"] + ", owner: " + projects[i].owner.name + " (" + projects[i].owner.email + "), date: " + projects[i].created_at);
      // }
      callback(null,projects)
    });
  }
};
