var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
    response.json().then(function(data) {
        console.log(data);
    });
    console.log("inside", response);
    });

    console.log("outside");
};

getUserRepos();