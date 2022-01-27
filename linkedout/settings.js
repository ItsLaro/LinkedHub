import express from "express";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./db.js";
const router = express.Router();

/* Gets the user settings */
// To use: /settings/zackary-santana
router.get("/:linkedin_tag", async function (req, res) {
  const docSnap = await getDoc(doc(db, "users", req.params.linkedin_tag));
  if (docSnap.exists()) {
    const data = docSnap.data();
    res.json({
      gh_username: data.gh_username,
    });
  } else {
    res.status(404).json({
      error: "User is not found",
    });
  }
});

/* Change user settings */
router.post("/:linkedin_tag", function (req, res) {
  res.send("This is a response");
});

export default router;
