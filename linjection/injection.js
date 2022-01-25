// I removed the header being bold as the other sections were not.
// But this might be a difference in OS. The class is "text-heading-large" and was on the h2
const githubContent = `
<section id="ember311" class="artdeco-card ember-view break-words pb3 mt4">
    <div class="pvs-header__container">
      <div class="pvs-header__top-container--no-stack">
        <div class="pvs-header__left-container--stack">
          <div class="pvs-header__title-container">
            <h2 class="pv-profile-section__card-heading pvs-header__title">
              <!---->
              <span aria-hidden="true">GitHub</span>
              <!---->
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

const ghSection = document.createElement('div');
ghSection.className = "github-section";
ghSection.innerHTML = githubContent;

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
}

const injectGHSection = () => {
  // Grab experience section
  const expSection = findPreviousSection();
  
  // Inject in to webpage
  if (expSection != null) {
    expSection.parentNode.insertBefore(ghSection, expSection);
    console.log("Injection Success!");
  } else {
    console.log("Injection failed :(");
  }
}

const attemptInject = () => {
  setTimeout(() => {
    injectGHSection();
    attemptInject();
  }, 100);
}

const renderGitHubSection = () => {
  // Attempt to inject with github section
  attemptInject();
}

renderGitHubSection();
