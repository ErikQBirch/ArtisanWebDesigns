import { helperFunctions } from "./helperFunctions.js";
import { allProjects_DB } from "../resources/allProjects_DB.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    helperFunctions.lazyLoading();
    this.theEvents();
  },
  gallery: function(
    gallery_tag = helperFunctions.generateElement('section',"gallery"),
    count = 0
  ){
    for (let project in allProjects_DB){
        if (count < 9){
          let element = this.projectArticle(allProjects_DB[project])
          if (allProjects_DB[project].name == "About"){
            element.classList.add('About')
          }
          gallery_tag.appendChild(element);
          count++;
      }
    }
    return gallery_tag;
  },
  fullGallery: function(
    gallery_tag = helperFunctions.generateElement('section',"gallery"),
    main = document.querySelector('main')
  ){
    document.querySelector('section#gallery').remove();
    for (let project in allProjects_DB){
        let element = this.projectArticle(allProjects_DB[project])
        if (allProjects_DB[project].name != "About"){
          gallery_tag.appendChild(element);
        }
    }
    main.appendChild(gallery_tag);
    helperFunctions.lazyLoading();
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","assets/resources/imgs/background.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner","","I live in a world that balances between the intracate power of science and the inspiring wonder of art!<br>I am a web designer!")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    h1_tag = helperFunctions.generateElement('h1',"","","Portfolio"),
    hero_tag = this.hero(),
    gallery_tag = this.gallery(),
    moreSection = this.moreSection()){
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, h1_tag, gallery_tag, moreSection)
    return main_tag;
  },
  moreSection: function(
    section = helperFunctions.generateElement('section',"seeMore"),
    moreBtn = helperFunctions.generateElement('button',"moreBtn","","See More"),
    form = helperFunctions.generateElement('div'),
    input = helperFunctions.generateElement('input',"","text"),
    goBtn = helperFunctions.generateElement('button',"","","GO!"),
    failedMsg = helperFunctions.generateElement('span',"","","Incorrect! Try Again!")
  ){
    form = helperFunctions.appendChildren(form, input,goBtn);
    section = helperFunctions.appendChildren(section, moreBtn, form, failedMsg);

    form.style.display = "none";
    failedMsg.style.display = "none";
    return section;
  },
  projectArticle: function(
    projectObj,
    a_tag = helperFunctions.generateElement("a","","","",`${projectObj.preview.previewPath}`),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","thumbnail",""),
    overlay = helperFunctions.generateElement('div',"","",projectObj.name,""),
    thumbNail = helperFunctions.customSpecialElements(img_tag,projectObj.thumbnailPath,projectObj.name)
  ){
    figure_tag.appendChild(thumbNail);
    overlay.style.color = projectObj.color;
    // overlay.style.fontWeight = "bolder";
    overlay.style.textShadow = "0 0 2.5px white";
    a_tag = helperFunctions.appendChildren(a_tag, figure_tag, overlay);
    return a_tag;
  },
  theEvents: function(
    moreSection = document.querySelector('#seeMore'),
    moreDiv = moreSection.children[1]
  ){
    console.log(moreSection)
    moreSection.children[0].addEventListener('click',()=>{
      moreSection.children[1].style.display = "flex";
      moreSection.children[0].remove();
    })
    moreDiv.children[1].addEventListener('click', ()=>{
      if (moreDiv.children[0].value == "a"){
        moreSection.remove();
        this.fullGallery();
      }
      else {
        console.log("WRONG")
        moreDiv.children[0].value = "";
        console.log(moreSection.children[1])
        moreSection.children[1].style.display = "flex";
      }
    })
  }
}

pageStuff.constructHTML();