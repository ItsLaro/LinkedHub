import fetch from "node-fetch";
import express from "express";
import { getProject, putDefaultProjects, db } from "./db.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
const router = express.Router();

/* Gets the projects */
/* By default, gets pinned */
router.get("/:linkedin_tag", async function (req, res) {
  const docSnap = await getDoc(doc(db, "users", req.params.linkedin_tag));
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.hasOwnProperty("projects")) {
      res.json({
        gh_username: data.gh_username,
        projects: data.projects,
      });
    } else {
      putDefaultProjects(req.params.linkedin_tag, data.gh_username, res);
    }
  }
});

/* Puts different projects */
router.post("/:linkedin_tag", async function (req, res) {
  const docSnap = await getDoc(doc(db, "users", req.params.linkedin_tag));

  if (docSnap.exists()) {
    const data = docSnap.data(),
      body = JSON.parse(req.body),
      replaceIndex = parseInt(body.id),
      project_name = body.project_name;

    const newProject = await getProject(data.gh_username, project_name);
    body.projects[replaceIndex] = newProject;
    setDoc(doc(db, "users", req.params.linkedin_tag), {});
    if (data.hasOwnProperty("projects")) {
      res.json({
        gh_username: data.gh_username,
        projects: data.projects,
      });
    } else {
      putDefaultProjects(req.params.linkedin_tag, data.gh_username, res);
    }
  }
});

export default router;
