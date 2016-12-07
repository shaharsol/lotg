var gitlab = require ('./scms/gitlab.js');
var util = require('util')
// gitlab.getUserRepos('evm8NxEWJJNPqd6xuSta', function(err,projects){
//     console.log(projects);
// })
// gitlab.listRepoCommits('evm8NxEWJJNPqd6xuSta', 2128337,  function(err,commits){
//     console.log(commits)
// })
gitlab.commitsByUser('evm8NxEWJJNPqd6xuSta', 2128337, 'boris.kogan81@gmail.com', function(err,commits){
    console.log(commits)
})