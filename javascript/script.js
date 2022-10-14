let profile = {
  login: "loveBabbar",
  id: 29489915,
  node_id: "MDQ6VXNlcjI5NDg5OTE1",
  avatar_url: "https://avatars.githubusercontent.com/u/29489915?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/loveBabbar",
  html_url: "https://github.com/loveBabbar",
  followers_url: "https://api.github.com/users/loveBabbar/followers",
  following_url:
    "https://api.github.com/users/loveBabbar/following{/other_user}",
  gists_url: "https://api.github.com/users/loveBabbar/gists{/gist_id}",
  starred_url: "https://api.github.com/users/loveBabbar/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/loveBabbar/subscriptions",
  organizations_url: "https://api.github.com/users/loveBabbar/orgs",
  repos_url: "https://api.github.com/users/loveBabbar/repos",
  events_url: "https://api.github.com/users/loveBabbar/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/loveBabbar/received_events",
  type: "User",
  site_admin: false,
  name: "love babbar",
  company: null,
  blog: "",
  location: "new delhi",
  email: null,
  hireable: true,
  bio: "Student at NSIT, Delhi. || Android developer || Competitive Programmer || Putting steps into the ML world   ",
  twitter_username: null,
  public_repos: 10,
  public_gists: 0,
  followers: 2505,
  following: 1,
  created_at: "2017-06-16T18:24:13Z",
  updated_at: "2021-12-08T20:47:02Z",
};

let userInfo = {};

/* all declaration */

let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click",function(){
  let userInput = document.getElementById("userInput").value;
  if(userInput != ""){
    let request = new XMLHttpRequest();
    let url = `https://api.github.com/users/${userInput}`;
    request.open("GET", url, true);
    request.addEventListener("load", response);
    request.send();
  }
});




function response(e){
  let information = JSON.parse(e.target.responseText);
  if (information.message == "Not Found"){
    addErrorMessage();
  }
  else{
    userInfo = {
      username: information.login,
      name: information.name,
      avatar_url: information.avatar_url,
      followers: information.followers,
      following: information.following,
      bio: information.bio,
      location: information.location,
      repos_url: information.repos_url,
    };
  // console.log(userInfo);
  addToDOM(userInfo);
  }
}

// let profileSection = document.getElementById("profileSection");



let containerDiv = document.getElementById("containerDiv");
function addToDOM(userInfo){
  /* adding in dom container */
  let profileDiv = document.createElement("div");
  profileDiv.setAttribute("id", "profileDiv");
  containerDiv.appendChild(profileDiv);
  let profileSection = document.createElement("div");
  profileSection.setAttribute("id", "profileSection");
  profileDiv.appendChild(profileSection);

  let avatar = document.createElement("div");
  avatar.setAttribute("id", "avatar");
  profileSection.appendChild(avatar);
  let img = document.createElement("img");
  img.setAttribute("src", userInfo.avatar_url);
  avatar.appendChild(img);

  /* username and profile name */
  let p1 = document.createElement("p");
  p1.setAttribute("id", "profileName");
  p1.innerHTML = userInfo.name;
  let p2 = document.createElement("p");
  p2.setAttribute("id", "username");
  p2.innerHTML = userInfo.username;
  profileSection.appendChild(p1);
  profileSection.appendChild(p2);

  /* Bio */
  let bio = document.createElement("div");
  bio.setAttribute("id", "bio");
  bio.innerHTML = userInfo.bio;
  profileSection.appendChild(bio);

  /* followers and following */
  let followers = document.createElement("span");
  followers.setAttribute("id", "followers");
  followers.innerHTML = userInfo.followers + " followers ";
  profileSection.appendChild(followers);

  let following = document.createElement("span");
  following.setAttribute("id", "following");
  following.innerHTML = userInfo.following + " following";
  profileSection.appendChild(following);

  /* location */
  if(userInfo.location != null){
    let location = document.createElement("p");
    location.setAttribute("id", "userLocation");
    location.innerHTML =
      '<i class="fa-solid fa-location-dot"></i> ' + userInfo.location;
    profileSection.appendChild(location);
  }

  /* repositoriesSection */
  let repositoriesSection = document.createElement("div");
  repositoriesSection.setAttribute("id", "repositoriesSection");
  profileDiv.appendChild(repositoriesSection);

  /* Add repositry */
  addRepos(userInfo.repos_url, repositoriesSection);
}

function addRepos(reposLink, repositoriesSection) {
  let repos = new XMLHttpRequest();
  repos.open("GET", reposLink, true);
  repos.addEventListener("load", function () {
    let data = JSON.parse(repos.responseText);
    console.log(data);
    addReposToDOM(data, repositoriesSection);
  });
  repos.send();
}

function addReposToDOM(reposArr, repositoriesSection) {
  reposArr.forEach(function (obj) {
    console.log(obj.name);
    let a = document.createElement("a");
    a.setAttribute("href",obj.html_url);
    a.setAttribute("class","repos");
    a.setAttribute("target", "_blank");
    a.innerHTML = obj.name;
    repositoriesSection.appendChild(a);
  });
}
function addErrorMessage() {
  let profileDiv = document.createElement("div");
  profileDiv.setAttribute("id", "profileDiv");
  containerDiv.appendChild(profileDiv);
  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"
  );
  img.setAttribute("id","gifContainer");
  profileDiv.appendChild(img);
}