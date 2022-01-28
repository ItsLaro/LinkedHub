import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: `${process.env.PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.PROJECT_ID,
  storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
});
export const db = getFirestore();

export async function putSettings(in_tag, gh_username, projects) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      in_tag,
      gh_username,
      projects,
    });
    console.log("Document written with ID: ", docRef);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function putDefaultProjects(in_tag, gh_username, res) {
  // Query data from github
  const query = `
  query {
    user(login:"${gh_username}") {
      pinnedItems(first: 4, types: [REPOSITORY, GIST]) {
        totalCount
        edges {
          node {
              ... on Repository {
              name
              primaryLanguage {
                name
                color
              }
              description
              createdAt
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
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  })
    .then((ghRes) => ghRes.text())
    .then((ghRes) => {
      console.log(ghRes);
      const obj = JSON.parse(ghRes).data.user.pinnedItems.edges;
      res.json(obj);
    })
    .catch((error) => console.error(error));
}
