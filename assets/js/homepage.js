var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// FUNCTIONS
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
       displayRepos(data, user);
      });
    });
  };

var formSubmitHandler = function(event) {
event.preventDefault();
// Get value from input element
var username = nameInputEl.nodeValue.trim();

if (username) {
  getUserRepos(username);
  nameInputEl.value = "";
} else {
  alert("Please enter a GitHub username");
}
console.log(event);
};

var displayRepos = function(repos, searchTerm) {
  console.log(repos)
  console.log(searchTerm);
  // Clear Old Content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // Loop Over Repos
  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // Create A Container For Each Repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    // Create a Span Element to Hold Repository Name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    // Append to Container
    repoEl.appendChild(titleEl);
    // Append Contaier to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

// EVENT LISTENERS
userFormEl.addEventListener("submit", formSubmitHandler);