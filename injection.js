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

const createGitHubSection = () => {
  const element = document.createElement('div');
  element.className = "github-section";
  element.innerHTML = githubContent;
  return element;
}

const findExperienceSection = () => {
    // Zackary's machine (Windows 10) has the element ID as oc-background-section
    // Replaced the original element ID as experience (possibly what they send for IOS??)
    const experienceSection = document.getElementById("oc-background-section");

    if (experienceSection == null) {
      experienceSection = document.getElementById("experience");
    }
    return experienceSection;
}

const init = () => {
  // Create GitHub Section
  const ghSection = createGitHubSection();
  // Grab experience section
  const expSection = findExperienceSection();

  // Inject in to webpage
  if (expSection != null) {
    expSection.parentNode.insertBefore(ghSection, expSection);
    console.log("Injection Success!");
  } else {
    console.log("Injection failed :(")
  }
}

window.onload = init;
