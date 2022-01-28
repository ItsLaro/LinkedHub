const btn = document.getElementById("submit_btn");
const clear_btn = document.getElementById("clear_btn");
const gh_username_local = localStorage.getItem("github_username");
const in_username_local = localStorage.getItem("linkedin_username");
const youtube1_local = localStorage.getItem("youtube1");
const youtube2_local = localStorage.getItem("youtube2");
const youtube3_local = localStorage.getItem("youtube3");
const youtube4_local = localStorage.getItem("youtube4");
let youtube_mode = false;
document.getElementById("github_username").value = gh_username_local;
document.getElementById("linkedin_username").value = in_username_local;

if (
  gh_username_local != null &&
  in_username_local != null &&
  gh_username_local != "" &&
  in_username_local != ""
) {
  document.getElementById("hidden-until-filled").style = "display: show;";
  youtube_mode = true;
  document.getElementById("youtube1").value = youtube1_local;
  document.getElementById("youtube2").value = youtube2_local;
  document.getElementById("youtube3").value = youtube3_local;
  document.getElementById("youtube4").value = youtube4_local;
}

btn.addEventListener("click", myFunction);
function myFunction(event) {
  event.preventDefault();
  if (!youtube_mode) {
    const gh_username = document.getElementById("github_username").value;
    const in_username = document.getElementById("linkedin_username").value;
    if (gh_username == "" || in_username == "") {
      btn.value = "Invalid";
      setTimeout(() => {
        btn.value = "Submit";
      }, 2500);
      return;
    }

    btn.value = "Adding Account!";
    fetch("http://localhost:3000/settings/" + in_username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gh_username: gh_username }),
    })
      .then(function (response) {
        console.log(response);
        btn.value = "Added Account!";
        localStorage.setItem("github_username", gh_username);
        localStorage.setItem("linkedin_username", in_username);
        document.getElementById("hidden-until-filled").style = "display: show;";
        console.log("SHOW NOW");
        youtube_mode = true;
        setTimeout(() => {
          btn.value = "Add Youtube Videos";
        }, 2500);
      })
      .catch((err) => {
        btn.value = "Error :(";
        console.log(err);
      });
  } else {
    btn.value = "Adding Videos!";
    const gh_username = document.getElementById("github_username").value;
    const in_username = document.getElementById("linkedin_username").value;
    const youtube1 = document.getElementById("youtube1").value;
    const youtube2 = document.getElementById("youtube2").value;
    const youtube3 = document.getElementById("youtube3").value;
    const youtube4 = document.getElementById("youtube4").value;

    fetch("http://localhost:3000/settings/" + in_username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gh_username,
        youtube1,
        youtube2,
        youtube3,
        youtube4,
      }),
    })
      .then(function (response) {
        console.log(response);
        btn.value = "Added Account!";
        localStorage.setItem("github_username", gh_username);
        localStorage.setItem("linkedin_username", in_username);
        localStorage.setItem("youtube1", youtube1);
        localStorage.setItem("youtube2", youtube2);
        localStorage.setItem("youtube3", youtube3);
        localStorage.setItem("youtube4", youtube4);
        setTimeout(() => {
          btn.value = "Add Youtube Videos";
        }, 2500);
      })
      .catch((err) => {
        btn.value = "Error :(";
        console.log(err);
      });
  }
}

clear_btn.value = "Clear";
clear_btn.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.clear();
  youtube_mode = false;
  document.getElementById("hidden-until-filled").style = "display: none;";
  btn.value = "Submit";
  document.getElementById("github_username").value = "";
  document.getElementById("linkedin_username").value = "";
  document.getElementById("youtube1").value = "";
  document.getElementById("youtube2").value = "";
  document.getElementById("youtube3").value = "";
  document.getElementById("youtube4").value = "";
});
