import express from "express";
const router = express.Router();

/* Gets the user settings */
// To use: /settings/zackary-santana
router.get("/:linkedin_tag", function (req, res) {
  // return gh_username from firebase
  // using req.params.linkedin_tag
  res.send("This is a response");
});

/* Change user settings */
router.post("/", function (req, res) {
  res.send("This is a response");
});

export default router;
