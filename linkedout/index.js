var express = require("express");
var app = express();
const port = 3000;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.send("hello world");
});

// GET method route
app.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

// POST method route
app.post("/", function (req, res) {
  res.send("POST request to the homepage");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
