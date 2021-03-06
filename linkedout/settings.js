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
        youtube1: data.youtube1,
        youtube2: data.youtube2,
        youtube3: data.youtube3,
        youtube4: data.youtube4,
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
  const gh_username = req.body.gh_username,
    youtube1 = req.body.youtube1,
    youtube2 = req.body.youtube2,
    youtube3 = req.body.youtube3,
    youtube4 = req.body.youtube4;
  console.log(JSON.stringify(req.body));

  setDoc(
    doc(db, "users", req.params.linkedin_tag),
    {
      gh_username,
      youtube1,
      youtube2,
      youtube3,
      youtube4,
    },
    { merge: true }
  );

  res.send("added");
});

export default router;
