import { helperFunctions } from "./helperFunctions.js";
import { specialFeatures } from "./specialFeatures.js";
import { allProjects_DB } from "../resources/allProjects_DB.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    specialFeatures.lazyLoading();
    theEvents.clickEvents();
    theEvents.heroEffect();
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
    specialFeatures.lazyLoading();
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag1 = helperFunctions.generateElement('img',"","","","assets/resources/imgs/heroPics/hero0.webp"),
    img_tag2 = helperFunctions.generateElement('img',"","","","assets/resources/imgs/heroPics/hero1.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner","","I live in a world that balances between the intracate power of science and the inspiring wonder of art!<br>I am a Web Designer!")
  ){

    img_tag1.classList.add('dying');
    img_tag2.classList.add('keep');

    figure_tag = helperFunctions.appendChildren(figure_tag, img_tag1, img_tag2);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    text_div = helperFunctions.generateElement('div',"textDiv"),
    h1_tag = helperFunctions.generateElement('h1',"","","Portfolio"),
    span_tag = helperFunctions.generateElement('span',"","","Click/Tap on a project to view details"),
    hero_tag = this.hero(),
    gallery_tag = this.gallery(),
    moreSection = this.moreSection()){
      text_div = helperFunctions.appendChildren(text_div, h1_tag, span_tag);
      main_tag = helperFunctions.appendChildren(main_tag, hero_tag, text_div, gallery_tag, moreSection)
    return main_tag;
  },
  moreSection: function(
    section = helperFunctions.generateElement('section',"seeMore"),
    moreBtn = helperFunctions.generateElement('button',"moreBtn","","See More"),
    form = helperFunctions.generateElement('form'),
    input = helperFunctions.generateElement('input',"","text"),
    goBtn = helperFunctions.generateElement('button',"","","GO!"),
    failedMsg = helperFunctions.generateElement('span',"","",`Type in password to see more projects`)
  ){
    form = helperFunctions.appendChildren(form, input,goBtn);
    form.setAttribute('onSubmit',"fullGallery(); return false");

    section = helperFunctions.appendChildren(section, moreBtn, form, failedMsg);

    form.style.display = "none";
    failedMsg.style.display = "none";
    return section;
  },
  projectArticle: function(
    projectObj,
    a_tag = helperFunctions.generateElement("a","","","",`${projectObj.preview.previewPath}`),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","lazyLoad",""),
    overlay = helperFunctions.generateElement('div',"","",projectObj.name,""),
    lazyLoad = helperFunctions.customSpecialElements(img_tag,projectObj.thumbnailPath,projectObj.name)
  ){
    figure_tag.appendChild(lazyLoad);
    overlay.style.color = projectObj.color;
    // overlay.style.fontWeight = "bolder";
    // overlay.style.textShadow = "0 0 2.5px white";
    a_tag = helperFunctions.appendChildren(a_tag, figure_tag, overlay);
    return a_tag;
  },
  // theEvents: function(
  //   moreSection = document.querySelector('#seeMore'),
  //   moreDiv = moreSection.children[1]
  // ){
  //   console.log(moreSection)
  //   moreSection.children[0].addEventListener('click',()=>{
  //     moreSection.children[1].style.display = "flex";
  //     moreSection.children[2].style.display = "flex";
  //     moreSection.children[0].remove();
  //   })
  //   moreDiv.children[1].addEventListener('click', ()=>{
  //     if (moreDiv.children[0].value == "a"){
  //       moreSection.remove();
  //       this.fullGallery();
  //     }
  //     else {
  //       console.log("WRONG")
  //       moreDiv.children[0].value = "";
  //       console.log(moreSection.children[1])
  //       moreSection.children[1].innerHTML = `Failed Attempt! Try Again!`
  //     }
  //   })
  // },
}
const theEvents = {
  clickEvents : function(
    moreSection = document.querySelector('#seeMore'),
    moreDiv = moreSection.children[1]
  ){
    console.log(moreSection)
    moreSection.children[0].addEventListener('click',()=>{
      moreSection.children[1].style.display = "flex";
      moreSection.children[2].style.display = "flex";
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
        moreSection.children[1].innerHTML = `Failed Attempt! Try Again!`
      }
    })
  },
  heroEffect: function(
    figure_tag = document.querySelector('#hero').children[0],
    counter = 2,
    fadeEffect = function(){
      let dyingImg = document.querySelector(`img.dying`);
      let subImg = document.querySelector(`img.keep`);
      // let counter;
      let newImg; 


    
      newImg = helperFunctions.generateElement('img',"","","",`assets/resources/imgs/heroPics/hero${counter}.webp`);

      counter++;

      if (counter == 5){
        counter = 0;
      }

      dyingImg.remove();
      subImg.classList.add("dying");
      subImg.classList.remove('keep');
      newImg.classList.add('keep');
      figure_tag.appendChild(newImg);
    

    }
  ){
    let fadingImg = setInterval(()=>{
      fadeEffect();
    },10000)   
  }
}

pageStuff.constructHTML();