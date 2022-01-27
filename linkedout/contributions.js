import express from "express";
import { putSettings } from "./db.js";
const router = express.Router();

/* Get contributions */
router.get("/", function (req, res) {
  res.send("Hey");
  putSettings("alex-lecusay-0a51a5217", "alexlecusay", []);
});

export default router;
