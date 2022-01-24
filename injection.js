const githubContent = `

<section id="ember311" class="artdeco-card ember-view break-words pb3
      
mt4"><!---->

<div id="experience" class="pv-profile-card-anchor"></div>
      <!---->
<div class="pvs-header__container">
<div class="pvs-header__top-container--no-stack">
<div class="pvs-header__left-container--stack">
<div class="pvs-header__title-container">
    <h2 class="pvs-header__title text-heading-large">
      <span aria-hidden="true"><!---->GitHub<!----></span><span class="visually-hidden"><!---->GitHub<!----></span>
    </h2>
<!----><!---->      </div>

<!---->    </div>

<!---->  </div></div></section>` 

const init = () => {
    const element = document.createElement('div');
    element.className = "github-section";
    element.innerHTML = githubContent;

    const experienceSection = document.getElementById("experience").parentNode
    const mainContainer = experienceSection.parentNode
    mainContainer.insertBefore(element, experienceSection)
    
    console.log("Hello Hack@Campus!")
}

window.onload = init;
