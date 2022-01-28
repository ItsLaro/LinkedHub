let attempt = 0;
let results = {};
const username = "ItsLaro";
const in_tag = window.location.pathname.split("/")[2];

fetch(`http://localhost:3000/settings/${in_tag}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    username = data.gh_username;
    results = data;
  })
  .catch((err) => {
    console.log(err);
  });

const contributions = `
<p class="pvs-header__subtitle text-body-small">
  <span aria-hidden="true">
    <a target="_self" href="https://github.com/ItsLaro">
      <strong>
        <!---->273 contributions in the last year<!---->
      </strong>
    </a>
  </span>
  <span class="visually-hidden">
    <a target="_self" href="https://github.com/ItsLaro">
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

const repos = `

`;

const mainContent = `
<h2 class="pvs-header__title text-heading-large">
<!---->
<span aria-hidden="true">Contributions</span>
${contributions}
<!---->
</h2>
<h2 class="pvs-header__title text-heading-large">
<!---->
<span aria-hidden="true">Repositories</span>
<!---->
</h2>
`;
const isMac = window.navigator.userAgentData.platform === "macOS";
const isWin = window.navigator.userAgentData.platform === "Windows";
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
              ${mainContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} else if (isMac) {
  githubContentSection = `
    <!---->
    <div id="experience" class="pv-profile-card-anchor"></div>
    <!---->
    <div class="pvs-header__container">
    <div>
    <div>
    <div class="pvs-header__title-container">
        <h2 class="pvs-header__title text-heading-large">
          <span aria-hidden="true"><!---->GitHub<!----></span><span class="visually-hidden"><!---->GitHub<!----></span>
        </h2>
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
    if (isWin) {
      expSection.parentNode.insertBefore(ghSection, expSection);
    } else if (isMac) {
      expSection.parentNode.parentNode.insertBefore(
        ghSection,
        expSection.parentNode
      );
    }
    console.log("Injection Success!");
  } else {
    console.log("Injection failed :(");
  }
};

const attemptInject = () => {
  setTimeout(() => {
    if (fetched) {
      injectGHSection();
    }
    attemptInject();
  }, 100);
};

const renderGitHubSection = () => {
  // Attempt to inject with github section
  attemptInject();
  injectGHSection();
};

renderGitHubSection();
