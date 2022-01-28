import fetch from "node-fetch";
import express from "express";
const router = express.Router();

router.get("/:username", function (req, res) {
  const query = `
      query { 
        user(login: "${req.params.username}"){
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }
      `;
  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
    .then((res) => res.text())
    .then((body) => {
      return res.send(
        JSON.stringify(
          JSON.parse(body).data.user.contributionsCollection
            .contributionCalendar
        )
      );
    })
    .catch((error) => console.error(error));
});

export default router;
