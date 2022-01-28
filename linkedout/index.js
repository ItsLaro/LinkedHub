import fetch from "node-fetch";
import express from "express";
import cors from "cors";

import settings from "./settings.js";
import projects from "./projects.js";
import contributions from "./contributions.js";

const app = express(),
  port = 3000;

app.use(cors());

app.use("/settings/", settings);
app.use("/projects/", projects);
app.use("/contributions/", contributions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
