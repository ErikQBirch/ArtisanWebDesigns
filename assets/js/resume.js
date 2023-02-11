import { helperFunctions } from "./helperFunctions.js";
import { skillDB } from "../resources/skillDB.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/background.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    figure = helperFunctions.generateElement('a',"","","","../assets/resources/ErikQ.Birch_standardResume.pdf"),
    resume_webp = helperFunctions.generateElement('img',"","","Resume","../assets/resources/imgs/resume.webp"),
   ){
      main_tag = helperFunctions.nestChildren(main_tag, figure, resume_webp);
    return main_tag;
  },


}

pageStuff.constructHTML();