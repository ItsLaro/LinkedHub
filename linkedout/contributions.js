import express from "express";
const router = express.Router();

/* Get contributions */
router.get("/", function (req, res) {
  res.send("Hey");
});

export default router;
