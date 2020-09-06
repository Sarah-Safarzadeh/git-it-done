var getRepoIssues = function(repo) {
console.log(repo);
var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
fetch(apiUrl).then(function(response) {
    // Request Was Successful
    if (response.ok) {
        response.json().then(function(data) {
            console.log(data);
        });
    } else {
        alert("there was a problem with your request!");
    }
});
};

getRepoIssues("facebook/react");