import { helperFunctions } from "./helperFunctions.js";
import { previewDB } from "../resources/previewDB.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    helperFunctions.lazyLoading();
  },
  gallery: function(
    gallery_tag = helperFunctions.generateElement('section',"gallery")
  ){
    // console.log(previewDB);
    for (let project in previewDB){
      // console.log(previewDB[project]);
      let element = this.projectArticle(previewDB[project])
      if (previewDB[project].name == "About"){
        element.classList.add('About')
      }
      gallery_tag.appendChild(element);
    }
    
    return gallery_tag;
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","assets/resources/imgs/background.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    h1_tag = helperFunctions.generateElement('h1',"","","Portfolio")){
      main_tag = helperFunctions.appendChildren(main_tag, this.hero(), h1_tag, this.gallery())
    
    return main_tag;
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
    a_tag = helperFunctions.appendChildren(a_tag, figure_tag, overlay);
    return a_tag;
  }


}

pageStuff.constructHTML();