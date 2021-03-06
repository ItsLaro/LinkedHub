let isFetched = false;
let isRerender = false;
let index = 0;

let username = "";
let in_tag = window.location.pathname.split("/")[2];

let newHTML = "";

const isMac = window.navigator.userAgentData.platform === "macOS";
const isWin = window.navigator.userAgentData.platform === "Windows";

let pinnedRepos = [];
let numRepos = 0;
let numContributions = 0;
let pinnedRepo1 = {};
let githubProfileURL = "";
let githubProfilePicURL = "";
let projectTitle = pinnedRepo1.name;
let primaryLanguageName = "";
let primaryLanguageColor = "";
let projectSubTitle = "";
let projectDatetime = "";
let projectDescription = "";

let videoDemoURL = null;
let youtubes = [];

const mainFunction = () => {
  fetchInfo(() => {
    renderGitHubSection();
  });
};
mainFunction();

function fetchInfo(runnable) {
  in_tag = window.location.pathname.split("/")[2];
  fetch(`http://localhost:3000/settings/${in_tag}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      index = 0;
      username = data.gh_username;
      pinnedRepos = data.projects;
      numRepos = pinnedRepos.length;
      pinnedRepo1 = pinnedRepos[0].node;
      githubProfileURL = pinnedRepo1.owner.url;
      githubProfilePicURL = pinnedRepo1.owner.avatarUrl;
      projectTitle = pinnedRepo1.name;
      primaryLanguageName = pinnedRepo1.primaryLanguage.name;
      primaryLanguageColor = pinnedRepo1.primaryLanguage.color;
      projectSubTitle = "Personal Project, using " + primaryLanguageName;
      const date = new Date(pinnedRepo1.createdAt.substring(0, 10));
      const ending =
        date == 1 ? "st" : date == 2 ? "nd" : date == 3 ? "rd" : "th";
      projectDatetime =
        new Intl.DateTimeFormat("en-US", { month: "long" }).format(date) +
        " " +
        date.getDate() +
        ending +
        ", " +
        date.getFullYear();
      projectDescription =
        pinnedRepo1.description === null ? "" : pinnedRepo1.description;

      isFetched = true;
      youtubes = [data.youtube1, data.youtube2, data.youtube3, data.youtube4];
      videoDemoURL = youtubes[0];

      fetch(`http://localhost:3000/contributions/${username}`)
        .then((response) => {
          console.log("Fetched");
          return response.json();
        })
        .then((data) => {
          numContributions = data.totalContributions;

          isRerender = false;
          if (document.getElementById("github-section") !== null) {
            document.getElementById("github-section").remove();
            console.log("New Profile loaded, Removed previous github section");
          }
          newHTML = generateHTML();
          runnable();
        });
    })
    .catch((err) => {
      if (document.getElementById("github-section") !== null) {
        document.getElementById("github-section").remove();
        console.log("Fetch Failed. Removed stale section!");
      }
      console.log(err);
    });
}

const generateHTML = () => {
  const contributions = `
  <p class="pvs-header__subtitle text-body-small">
    <span aria-hidden="true">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->${numContributions} total contributions<!---->
        </strong>
      </a>
    </span>
    <span class="visually-hidden">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->${numContributions} contributions in the last year<!---->
        </strong>
      </a>  
    </span>
  </p>
  <div class="calendar">
    <img src="https://ghchart.rshah.org/409ba5/${username}" alt="2016rshah's Blue Github Chart" style="width:100%;padding:8px"/>
  </div>
  `;

  const videoEmbed =
    videoDemoURL === null
      ? `
  `
      : `<iframe id="videoDemo" width="100%" height="220px" style="padding-right:20px;padding-top:16px;transform:translate(-20px,0);" src="${videoDemoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  const btn_style = `
  <style>
  .btn-lh {
    background-color: var(--voyager-color-action);
    color: var(--color-text-shift-on-dark-flip);
    font-size: 1.6rem;
    padding: 0.6rem 0;
    line-height: 2rem;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-duration: 167ms;
    align-items: center;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    height: fit-content;
    transition-property: background-color,box-shadow,color;
    vertical-align: middle;
    margin-right: 0;
    margin-left: 0;
    margin-top: 25px;
    border-radius: var(--corner-radius-large)!important;
    padding-left: 1.6rem!important;
    padding-right: 1.6rem!important;
  }
  #prevButton {
    transform:translate(-50px,0);
  }
  </style>
  `;

  const repo1 = `
  <div class="display-flex flex-column full-width align-self-center">
  <div class="display-flex flex-row justify-space-between">
     <div class="display-flex flex-column full-width">
        <div class="display-flex align-items-center">
           <span class="t-bold mr1
              ">
              <span id="projectTitle" aria-hidden="true">
                 <!---->${projectTitle}<!---->
              </span>
              <span class="visually-hidden">
                 <!---->${projectTitle}<!---->
              </span>
           </span>
           <!----><!----><!---->        
        </div>
        ${btn_style}
        <span class="t-14 t-normal" id="projectSubTitleContainer">
           <span id="projectSubTitle" aria-hidden="true">
              <!---->${projectSubTitle}<!---->
           </span>
           <span class="visually-hidden">
              <!---->${projectSubTitle}<!---->
           </span>
           <style>
              #projectSubTitle {
                position: relative;
              }
              #projectSubTitleContainer {
                --primary: ${primaryLanguageColor};
              }
              #projectSubTitle::after {
                background-color: var(--primary);
                display: inline-block;
                position: absolute;
                top: 4px;
                right: -20px;
                border-radius: 50%;
                content: '';
                width: 12px;
                height: 12px;
              }
           </style>
        </span>
        <span class="t-14 t-normal t-black--light">
           <span id="projectDatetime" aria-hidden="true">
              <!---->${projectDatetime}<!---->
           </span>
           <span class="visually-hidden">
              <!---->${projectDatetime}<!---->
           </span>
        </span>
     </div>
     <!---->
     <div class="pvs-entity__action-container">
        <!---->      
     </div>
  </div>
  <div class="pvs-list__outer-container">
     <!---->    
     <ul class="pvs-list
        ">
        <li class=" ">
           <div class="pvs-list__outer-container">
              <!---->    
              <ul class="pvs-list
                 ">
                 <li class="pvs-list__item--with-top-padding ">
                    <div class="display-flex" style="align-items: center;justify-content:center;">
                    <button id="prevButton" class="btn-lh" style="display: none;"><</button>
                       ${videoEmbed}
                       <div class="display-flex" style="align-items: center;justify-content:center;flex-direction:column;padding-right: 15px;width: 400px;padding-left:20px;transform:translate(-20px,0);">
                           <p id="projectDescription" style="padding-top: 20%;text-align:center;font-size:14px;">${projectDescription}</p>
                           <button class="btn-lh" id="inquireButton">Inquire</button>
                       </div>
                       <button id="nextButton" class="btn-lh">></button>
                    </div>
                 </li>
              </ul>
              <!---->
           </div>
        </li>
     </ul>
     <!---->
  </div>
</div>
  `;

  const repos = `
  <p class="pvs-header__subtitle text-body-small">
  <span aria-hidden="true">
     <a target="_self" href="https://github.com/${username}?tab=repositories">
        <strong>
           <!---->${numRepos} featured projects<!---->
        </strong>
     </a>
  </span>
  <span class="visually-hidden">
     <a target="_self" href="https://github.com/${username}?tab=repositories">
        <strong>
           <!---->${numRepos} featured projects<!---->
        </strong>
     </a>
  </span>
</p>
<li class="artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column">
  <!---->
  <div class="pvs-entity
     pvs-entity--padded pvs-list__item--no-padding-when-nested
     ">
     <div>
        <a id="profileURL" data-field="experience_company_logo" class="optional-action-target-wrapper display-flex" target="_self" href="${githubProfileURL}">
           <div class="ivm-image-view-model  pvs-entity__image ">
              <div class="ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag display-flex
                 ">
                 <!---->      <img id="profilePic" width="48" src="${githubProfilePicURL}" loading="lazy" height="48" alt="Facebook logo" id="ember143" class="ivm-view-attr__img--centered EntityPhoto-square-3  lazy-image ember-view">
              </div>
           </div>
        </a>
     </div>
      ${repo1}
  </div>
</li>
  `;

  const largeForMac = isMac ? "text-heading-large" : "t-14";

  const mainContent = `
  <h2 class="pvs-header__title ${largeForMac}">
    <!---->
    <span aria-hidden="true">Contributions</span>
    <!---->
  </h2>
  ${contributions}
  <h2 class="pvs-header__title ${largeForMac}">
    <!---->
    <span aria-hidden="true">Repositories</span>
    <!---->
  </h2>
  ${repos}
  `;

  let githubContentSection = "Error";
  if (isWin) {
    githubContentSection = `
        <div class="pvs-header__container">
          <div>
            <div>
              <div class="pvs-header__title-container">
                <h2 class="pv-profile-section__card-heading pvs-header__title">
                  <!---->
                  <span aria-hidden="true">GitHub</span>
                  <!---->
                </h2>
                <a target="_self" href="https://github.com/${username}">
                  <strong>
                    <!---->${githubProfileURL}<!---->
                  </strong>
                </a>
                ${mainContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (isMac) {
    githubContentSection = `
    <div class="pvs-header__container">
    <div class="pvs-header__top-container--no-stack">
       <div class="pvs-header__left-container--stack">
          <div class="pvs-header__title-container">
             <h2 class="pvs-header__title text-heading-large">
                <span aria-hidden="true">
                   <!---->Github<!---->
                </span>
                <span class="visually-hidden">
                   <!---->Github<!---->
                </span>
             </h2>
             <!----><!---->      
             <p class="pvs-header__subtitle text-body-small">
    <span aria-hidden="true">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->${githubProfileURL}<!---->
        </strong>
      </a>
    </span>
    <span class="visually-hidden">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->${githubProfileURL}<!---->
        </strong>
      </a>  
    </span>
  </p>
          </div>
          <!---->    
       </div>
       <div class="pvs-header__right-container">
       </div>
    </div>
 </div>
 <!---->
 <div id="experience" class="pv-profile-card-anchor"></div>
 <!---->
 <div class="pvs-header__container">
    <div>
       <div>
          <div class="pvs-header__title-container">
             ${mainContent}
             <!----><!---->      
          </div>
          <!---->    
       </div>
       <!---->  
    </div>
 </div>
  `;
  }

  const ghSection = document.createElement("section");
  ghSection.id = "github-section";
  ghSection.className =
    "github-section artdeco-card ember-view break-words pb3 mt4";
  ghSection.innerHTML = githubContentSection;

  return ghSection;
};

const findPreviousSection = () => {
  // Zackary's machine (Windows 10) has the element ID as oc-background-section
  // Replaced the original element ID as experience (possibly what they send for IOS??)
  // Attempt to find "experience" section in linkedin page
  let previousSection = document.getElementById("oc-background-section");

  if (previousSection == null) {
    // This is another catch for the "experience" section
    previousSection = document.getElementById("experience");
  }
  return previousSection;
};

const injectGHSection = () => {
  // Grab experience section
  const expSection = findPreviousSection();
  // Inject in to webpage
  if (expSection != null) {
    if (document.getElementById("github-section") == null) {
      if (isWin) {
        expSection.parentNode.insertBefore(newHTML, expSection);
      } else if (isMac) {
        expSection.parentNode.parentNode.insertBefore(
          newHTML,
          expSection.parentNode
        );
      }
      console.log("Injection Success!");
      document.getElementById("nextButton").addEventListener("click", nextRepo);
      document.getElementById("prevButton").addEventListener("click", prevRepo);
      document.getElementById("inquireButton").addEventListener("click", () => {
        messageBtnClick();
        setTimeout(() => {
          document.execCommand(
            "insertHTML",
            false,
            "Hey I saw your project, " +
              projectTitle +
              ", written in " +
              primaryLanguageName +
              ". It looked really cool and I was wondering if you could tell me more about it."
          );
        }, 450);
      });

      isRerender = false;
    } else {
      console.log("Injection Succeeded already!");
    }
  } else {
    console.log("Injection failed :(");
  }
};

const attemptInject = () => {
  setTimeout(() => {
    if (isFetched) {
      injectGHSection();
    }
    if (in_tag != window.location.pathname.split("/")[2]) {
      console.log("NEED A rerender");
      isRerender = true;
      if (document.getElementById("github-section") !== null) {
        document.getElementById("github-section").remove();
        console.log("Removed stale github section");
      }
      mainFunction();
    }
    attemptInject();
  }, 100);
};

const renderGitHubSection = () => {
  // Attempt to inject with github section
  attemptInject();
  injectGHSection();
};

const nextRepo = () => {
  if (index < numRepos - 1) {
    ++index;
    console.log(
      "Next Clicked!",
      "Repos",
      pinnedRepos,
      "Index:",
      index,
      "Current Repo:",
      pinnedRepos[index].node
    );
    bindData(index, pinnedRepos[index].node);
    console.log("Next Repo:", pinnedRepos[index + 1]);
    document.getElementById("prevButton").style = "display: show;";
    if (index == numRepos - 1) {
      document.getElementById("nextButton").style = "display: none;";
    } else {
      document.getElementById("nextButton").style = "display: show;";
    }
  }
};

const prevRepo = () => {
  if (index > 0) {
    index--;
    console.log(
      "Prev Clicked!",
      "Repos",
      pinnedRepos,
      "Index:",
      index,
      "Current Repo:",
      pinnedRepos[index].node
    );
    bindData(index, pinnedRepos[index].node);
    document.getElementById("nextButton").style = "display: show";
    if (index == 0) {
      document.getElementById("prevButton").style = "display: none";
    } else {
      document.getElementById("prevButton").style = "display: show";
    }
  }
};

const bindData = (index, pinnedRepo) => {
  document.getElementById("projectTitle").innerHTML = pinnedRepo.name;
  document.getElementById("projectSubTitleContainer").style =
    "--primary: " + pinnedRepo.primaryLanguage.color + " !important";

  document.getElementById(
    "projectSubTitle"
  ).innerHTML = `Personal Project, using ${pinnedRepo.primaryLanguage.name}`;
  const date = new Date(pinnedRepo.createdAt.substring(0, 10));
  const ending = date == 1 ? "st" : date == 2 ? "nd" : date == 3 ? "rd" : "th";
  document.getElementById("projectDatetime").innerHTML =
    new Intl.DateTimeFormat("en-US", { month: "long" }).format(date) +
    " " +
    date.getDate() +
    ending +
    ", " +
    date.getFullYear();
  document.getElementById("projectDescription").innerHTML =
    pinnedRepo.description === null ? "" : pinnedRepo.description;
  if (
    youtubes[index] == null ||
    youtubes[index] == undefined ||
    youtubes[index] == ""
  ) {
    document.getElementById("videoDemo").style = "display: none;";
  } else {
    document.getElementById("videoDemo").style =
      "display: show;padding-right:20px;padding-top:16px;transform:translate(-20px,0);";
    document.getElementById("videoDemo").src = youtubes[index];
  }
  document.getElementById("profileURL").href = pinnedRepo.owner.url;
  document.getElementById("profilePic").src = pinnedRepo.owner.avatarUrl;
  // primaryLanguageColor = pinnedRepo1.primaryLanguage.color;
};

function messageBtnClick() {
  document.getElementsByClassName("message-anywhere-button")[0].click();
}
