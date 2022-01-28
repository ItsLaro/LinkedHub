import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
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

      setDoc(doc(db, "users", in_tag), {
        gh_username: gh_username,
        projects: JSON.stringify(obj),
      });

      obj["gh_username"] = gh_username;

      res.json(obj);
    })
    .catch((error) => console.error(error));
}

export async function getProject(gh_username, project_name) {
  const query = `{
  repository(
    owner: "${gh_username}"
    name: "${project_name}"
  ) {
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
}`;
  const ghRes = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const text = await ghRes.text();
  return text;
}
