var gitlab = require ('./scms/gitlab.js');
var util = require('util')
gitlab.getUserRepos('evm8NxEWJJNPqd6xuSta', function(err,projects){
    console.log(util.inspect(projects))
    
})
