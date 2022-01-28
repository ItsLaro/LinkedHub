import bodyParser from "body-parser";
import express from "express";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, putDefaultProjects } from "./db.js";
const router = express.Router();
const jsonParser = bodyParser.json();

/* Gets the user settings */
// To use: /settings/zackary-santana
router.get("/:linkedin_tag", async function (req, res) {
  const docSnap = await getDoc(doc(db, "users", req.params.linkedin_tag));
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.hasOwnProperty("projects")) {
      res.json({
        gh_username: data.gh_username,
        projects: JSON.parse(data.projects),
      });
    } else {
      putDefaultProjects(req.params.linkedin_tag, data.gh_username, res);
    }
  } else {
    res.status(404).json({
      error: "User is not found",
    });
  }
});

/* Change user settings */
router.post("/:linkedin_tag", jsonParser, function (req, res) {
  const gh_username = req.body.gh_username;
  console.log(JSON.stringify(req.body));

  setDoc(
    doc(db, "users", req.params.linkedin_tag),
    {
      gh_username,
    },
    { merge: true }
  );

  res.send("added");
});

export default router;
