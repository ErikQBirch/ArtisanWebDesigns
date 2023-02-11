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
    h1_tag = helperFunctions.generateElement('h1',"","","Skills")){
      main_tag = helperFunctions.appendChildren(main_tag, this.hero(), h1_tag);
      for (let obj in skillDB){
        // console.log(obj, skillDB[obj]);
        let article = this.skill_article(skillDB[obj]);
        main_tag.appendChild(article);
      }
    
    return main_tag;
  },
  skill_article: function(
    obj,
    article = helperFunctions.generateElement('article'),
    side_1 = helperFunctions.generateElement('div',"side_1"),
    side_2 = helperFunctions.generateElement('div', "side_2"),
    h2 = helperFunctions.generateElement('h2',"","",obj.name),
    descript = helperFunctions.generateElement('p',"","",obj.descript),
    figure = helperFunctions.generateElement('figure'),
    img = helperFunctions.generateElement('img',"","",obj.name,obj.imgPath)
  ){
    console.log(obj.id);
    if (obj.id%2 == 0){
      article.classList.add('flipped');
    }
    side_1 = helperFunctions.appendChildren(side_1, h2,descript);
    side_2 = helperFunctions.nestChildren(side_2, figure, img)
    article = helperFunctions.appendChildren(article, side_1, side_2);

    return article;
  }

}

pageStuff.constructHTML();