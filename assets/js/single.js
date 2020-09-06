var issueContainerEl = document.querySelector("#issues-container");

var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function (repo) {
    console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function (response) {
        // Request Was Successful
        if (response.ok) {
            response.json().then(function (data) {

                // Pass Response Data to DOM Function
                displayIssues(data);
                if (issues.length === 0) {
                    issueContainerEl.textContent = "This repo has no open issues!";
                    return;
                }
                for (var i = 0; i < issues.length; i++) {

                    // Create a Link Element to Take Users to The Issue On GitHub
                    var issueEl = document.createElement("a");
                    issueEl.classList = "list-item flex-row justify-space-between align-center";
                    issueEl.setAttribute("href", issues[i].html_url);
                    issueEl.setAttribute("target", "_blank");

                    // Create Span to Hold Issue Title
                    var titleEl = document.createElement("span");
                    titleEl.textContent = issues[i].title;

                    // Append to Container
                    issueEl.appendChild(titleEl);

                    // Create a Type Element
                    var typeEl = document.createElement("span");

                    // check if issue is an actual issue or a pull request
                    if (issues[i].pull_request) {
                        typeEl.textContent = "(Pull request)";
                    } else {
                        typeEl.textContent = "(Issue)";
                    }

                    // append to container
                    issueEl.appendChild(typeEl);

                    // Append to Page
                    issueContainerEl.appendChild(issuesEl);
                }
            });
        } else {
            alert("there was a problem with your request!");
        }
    });
    if (response.ok) {
        response.json().then(function(data) {
          displayIssues(data);
      
          // check if api has paginated issues
          if (response.headers.get("Link")) {
            console.log("repo has more than 30 issues");
          }
        });
      }
};
var displayRepos = function (issues) {

};

var displayWarning = function(repo) {
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // Append to Warning Container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");