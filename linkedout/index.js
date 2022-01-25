import fetch from 'node-fetch';
import express from 'express';

var app = express();
const port = 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

// GET method route
app.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

// GET method for pinned repos
app.get("/pinned", function (req, res) {

  const accessToken = GITHUB_TOKEN;

  const query = `
    query {
      user(login:"ItsLaro") {
          pinnedItems(first: 4, types: [REPOSITORY, GIST]) {
              totalCount
              edges {
                  node {
                      ... on Repository {
                      name
                      }
                  }
              }
          }
      }
    }`;

  fetch('https://api.github.com/graphql', {
  method: 'POST',
  body: JSON.stringify({query}),
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
}).then(res => res.text())
  .then(body => res.send(body)) 
  .catch(error => console.error(error));
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
