const btn = document.getElementById("submit_btn");
btn.addEventListener("click", myFunction);
function myFunction(event) {
  event.preventDefault();
  btn.value = "Adding Account!";
  const gh_username = document.getElementById("github_username").value;
  const in_username = document.getElementById("linkedin_username").value;
  console.log(JSON.stringify({ gh_username }));

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
    })
    .catch((err) => {
      btn.value = "Error :(";
      console.log(err);
    });
}
