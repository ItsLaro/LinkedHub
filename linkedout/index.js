import fetch from "node-fetch";
import express from "express";

import settings from "./settings.js";
import contributions from "./contributions.js";
import projects from "./projects.js";

const app = express(),
  port = 3000,
  GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use("/settings/:username", settings);
app.use("/contributions/:username", contributions);
app.get("/projects/:username", projects);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
