import express from "express";
const router = express.Router();

/* Gets the user settings */
router.get("/", function (req, res) {
  res.send("This is a response");
});

/* Change user settings */
router.post("/", function (req, res) {
  res.send("This is a response");
});

export default router;
