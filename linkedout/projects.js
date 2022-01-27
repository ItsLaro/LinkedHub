import fetch from "node-fetch";
import express from "express";
const router = express.Router();

/* Gets the projects */
/* By default, gets pinned */
router.get("/", function (req, res) {
  const query = `
      query {
        user(login:"${req.params.username}") {
          pinnedItems(first: 4, types: [REPOSITORY, GIST]) {
            totalCount
            edges {
              node {
                  ... on Repository {
                  name
                  isPrivate
                  primaryLanguage {
                      name
                      color
                    }
                  description
                  createdAt
                  updatedAt
                  resourcePath
                  owner {
                    login
                    avatarUrl
                    url
                  }
                }
              }
            }
          }
        }
      }
    `;

  fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  })
    .then((ghRes) => ghRes.text())
    .then((ghRes) => res.send(ghRes))
    .catch((error) => console.error(error));
});

export default router;
