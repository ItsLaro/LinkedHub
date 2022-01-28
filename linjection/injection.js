let attempt = 0;
let isFetched = false;
let username = "";
const in_tag = window.location.pathname.split("/")[2];

let newHTML = ""

const isMac = window.navigator.userAgentData.platform === "macOS";
const isWin = window.navigator.userAgentData.platform === "Windows";

let pinnedRepos = [];
let numRepos = 0;
let pinnedRepo1 = {};
let githubProfileURL = "";
let githubProfilePicURL = "";
let projectTitle = pinnedRepo1.name;
let projectSubTitle = "";
let projectDatetime = "";
let projectDescription = "";
let primaryLanguageName = "";
let primaryLanguageColor = "";
let videoDemoURL = null;

fetch(`http://localhost:3000/settings/${in_tag}`)
  .then((response) => {
    console.log("Fetched");
    return response.json();
  })
  .then((data) => {
    username = data.gh_username;
    pinnedRepos = data.projects;
    numRepos = pinnedRepos.length;
    pinnedRepo1 = pinnedRepos[0].node;
    githubProfileURL = pinnedRepo1.owner.url;
    githubProfilePicURL = pinnedRepo1.owner.avatarUrl;
    projectTitle = pinnedRepo1.name;
    projectSubTitle = "Personal Project";
    projectDatetime = pinnedRepo1.createdAt;
    projectDescription = pinnedRepo1.description === null ? "" : pinnedRepo1.description;
    primaryLanguageName = pinnedRepo1.primaryLanguage.name;
    primaryLanguageColor = pinnedRepo1.primaryLanguage.color;
    isFetched = true;
    videoDemoURL = "https://www.youtube.com/embed/Mv_JULBp-c4" //TODO: Get from response
    
    newHTML = generateHTML();
    renderGitHubSection();
  })
  .catch((err) => {
    console.log(err);
  });

const generateHTML = () => {

  const contributions = `
  <p class="pvs-header__subtitle text-body-small">
    <span aria-hidden="true">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->273 contributions in the last year<!---->
        </strong>
      </a>
    </span>
    <span class="visually-hidden">
      <a target="_self" href="https://github.com/${username}">
        <strong>
          <!---->273 contributions in the last year<!---->
        </strong>
      </a>  
    </span>
  </p>
  <div class="calendar">
    <img src="https://ghchart.rshah.org/409ba5/${username}" alt="2016rshah's Blue Github Chart" style="width:100%;padding:8px"/>
  </div>
  `;

  const videoEmbed = videoDemoURL === null ? `
  ` : `<iframe width="100%" height="412" style="padding-right:56px;padding-top:16px;" src="${videoDemoURL}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  const repo1 = `
  <div class="display-flex flex-column full-width align-self-center">
  <div class="display-flex flex-row justify-space-between">
     <div class="display-flex flex-column full-width">
        <div class="display-flex align-items-center">
           <span class="t-bold mr1
              ">
              <span aria-hidden="true">
                 <!---->${projectTitle}<!---->
              </span>
              <span class="visually-hidden">
                 <!---->${projectTitle}<!---->
              </span>
           </span>
           <!----><!----><!---->        
        </div>
        <span class="t-14 t-normal">
           <span aria-hidden="true">
              <!---->${projectSubTitle}<!---->
           </span>
           <span class="visually-hidden">
              <!---->${projectSubTitle}<!---->
           </span>
        </span>
        <span class="t-14 t-normal t-black--light">
           <span aria-hidden="true">
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
                    <div class="display-flex ">
                       <div class="display-flex full-width">
                          <div class="pv-shared-text-with-see-more t-14 t-normal t-black display-flex align-items-center">
                             <div class="inline-show-more-text inline-show-more-text--is-collapsed" style="line-height:1.9rem;max-height:3.8rem;">
                                <span aria-hidden="true">
                                   <!---->${projectDescription}<!---->
                                </span>
                                <span class="visually-hidden">
                                   <!---->${projectDescription}<!---->
                                </span>
                                <!---->
                             </div>
                          </div>
                       </div>
                    </div>
                    <div class="display-flex ">
                       ${videoEmbed}
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
  `

  const repos = 
  `
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
        <a data-field="experience_company_logo" class="optional-action-target-wrapper display-flex" target="_self" href="${githubProfileURL}">
           <div class="ivm-image-view-model  pvs-entity__image ">
              <div class="ivm-view-attr__img-wrapper ivm-view-attr__img-wrapper--use-img-tag display-flex
                 ">
                 <!---->      <img width="48" src="${githubProfilePicURL}" loading="lazy" height="48" alt="Facebook logo" id="ember143" class="ivm-view-attr__img--centered EntityPhoto-square-3  lazy-image ember-view">
              </div>
           </div>
        </a>
     </div>
      ${repo1}
  </div>
</li>
  `

  const mainContent = `
  <h2 class="pvs-header__title text-heading-large">
  <!---->
  <span aria-hidden="true">Contributions</span>
  <!---->
  </h2>
  ${contributions}
  <h2 class="pvs-header__title text-heading-large">
  <!---->
  <span aria-hidden="true">Repositories</span>
  <!---->
  </h2>
  ${repos}
  `;

  let githubContentSection = "Error";
  if (isWin) {
    githubContentSection = `
        <div class="pvs-header__container"  id="github-section">
          <div>
            <div>
              <div class="pvs-header__title-container">
                <h2 class="pv-profile-section__card-heading pvs-header__title">
                  <!---->
                  <span aria-hidden="true">GitHub</span>
                  <!---->
                </h2>
                ${mainContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (isMac) {
    githubContentSection = `

    <div class="pvs-header__container" id="github-section">
    <div class="pvs-header__top-container--no-stack">
      <div class="pvs-header__left-container--stack">
        <div class="pvs-header__title-container">
            <h2 class="pvs-header__title text-heading-large">
              <span aria-hidden="true"><!---->Github<!----></span><span class="visually-hidden"><!---->Github<!----></span>
            </h2>
  <!----><!---->      </div>

  <!---->    </div>

        <div class="pvs-header__right-container">
                        <a class="optional-action-target-wrapper artdeco-button artdeco-button--tertiary artdeco-button--3 artdeco-button--muted artdeco-button--circle
        inline-flex justify-center align-self-flex-start
        
        " target="_self" href="">
        <div class="pvs-navigation__icon">
          <li-icon type="add-icon" size="medium" role="img" aria-label="Add new project"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
    <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
  </svg></li-icon>
        </div>
  <!---->  </a>
          <a class="optional-action-target-wrapper artdeco-button artdeco-button--tertiary artdeco-button--3 artdeco-button--muted artdeco-button--circle
        inline-flex justify-center align-self-flex-start
        " target="_self" href="">
        <div class="pvs-navigation__icon">
          <li-icon type="pencil-icon" size="medium" role="img" aria-label="View experience detail screen"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
    <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
  </svg></li-icon>
        </div>
  <!---->  </a>
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
      <!----><!---->      </div>
      <!---->    </div>
      <!---->  </div>
      </div>
  `;
  }

  const ghSection = document.createElement("section");
  ghSection.className =
    "github-section artdeco-card ember-view break-words pb3 mt4";
  ghSection.innerHTML = githubContentSection;

  return ghSection;
}

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
      attempt++;
    }
    attemptInject();
  }, 100);
};

const renderGitHubSection = () => {
  // Attempt to inject with github section
  attemptInject();
  injectGHSection();
};