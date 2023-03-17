import { helperFunctions } from "./helperFunctions.js";

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
    banner_tag = helperFunctions.generateElement('div', "banner", "",""),
    h1 = helperFunctions.generateElement('h1',"","","This is a dead end."),
    h2 = helperFunctions.generateElement('h2',"","","Click/Tap anywhere to go back or navigate to a different part of the portfolio")
  ){
    banner_tag = helperFunctions.appendChildren(banner_tag, h1, h2);
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag);
    hero_tag.addEventListener('click',()=>{
      history.back();
    })
    return hero_tag
  },

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    h1_tag = helperFunctions.generateElement('h1',"","","Dead End")){
      main_tag = helperFunctions.appendChildren(main_tag, this.hero());
    return main_tag;
  }

}

pageStuff.constructHTML();