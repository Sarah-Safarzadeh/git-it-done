var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("div", "#language-buttons")

// FUNCTIONS
var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // Make a Request to the URL
    fetch(apiUrl)
    .then(function(response) {
      // Request Was Successful
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
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
  // Check if API Returned Any Repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  console.log(repos)
  console.log(searchTerm);
  // Clear Old Content
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  // Loop Over Repos
  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // Create A Link For Each Repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    // Create a Span Element to Hold Repository Name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    // Append to Container
    repoEl.appendChild(titleEl);
    // Create a Status Element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
    // Check if Current Repo Has Issues or Not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML = 
      "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    //Append to Container
    repoEl.appendChild(statusEl);
    // Append Contaier to the DOM
    repoContainerEl.appendChild(repoEl);
  }
};

var getFeaturedRepos = function(language) {
  var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var buttonClickHandler = function(event) {
var language = event.target.getAttribute("data-language");
console.log(language);
  if (language) {
    getFeaturedRepos(language);
    // clear old content
    repoContainerEl.textContent = "";
}
};

// EVENT LISTENERS
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);