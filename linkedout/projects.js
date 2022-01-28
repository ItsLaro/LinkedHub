import fetch from "node-fetch";
import express from "express";
import { putDefaultProjects } from "./db.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./db.js";
const router = express.Router();

/* Gets the projects */
/* By default, gets pinned */
router.get("/:linkedin_tag", async function (req, res) {
  const docSnap = await getDoc(doc(db, "users", req.params.linkedin_tag));
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.hasOwnProperty("projects")) {
      res.json({
        projects: data.projects,
      });
    } else {
      putDefaultProjects(req.params.linkedin_tag, data.gh_username, res);
    }
  }
});

export default router;
