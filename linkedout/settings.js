import express from "express";
const router = express.Router();

/* Gets the user settings */
// To use: /settings/zackary-santana
router.get("/:linkedin_tag", function (req, res) {
  var docRef = db.collection("users").doc(req.params.linkedin_tag);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});
  // return gh_username from firebase
  // using req.params.linkedin_tag
});

/* Change user settings */
router.post("/:linkedin_tag", function (req, res) {
  res.send("This is a response");
});

export default router;
