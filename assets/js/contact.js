import { helperFunctions } from "./helperFunctions.js";
import { specialFeatures } from "./specialFeatures.js";

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
    img_tag = helperFunctions.generateElement('img',"","","","","../assets/resources/imgs/heroPics/hero7.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner", "","Let me know WHEN you want to do business...")
  ){
    figure_tag.appendChild(img_tag);
    hero_tag = helperFunctions.appendChildren(hero_tag, figure_tag, banner_tag)
    return hero_tag
  },
  main: function(
    main_tag = helperFunctions.generateElement('main'),
    h1_tag = helperFunctions.generateElement('h1',"","","Contact")
  ){
      main_tag = helperFunctions.appendChildren(main_tag, this.hero(), h1_tag, specialFeatures.emailForm(), this.links());
    return main_tag;
  },
  links: function(
    linkSection = helperFunctions.generateElement('section',"linkSection"),
    // email = helperFunctions.generateElement('a',"email","email",'<i class="fa-solid fa-square-envelope"></i>',"","mailto:erikqbirch@gmail.com"),
    linkedIn = helperFunctions.generateElement('a',"linkedIn","",'<i class="fa-brands fa-linkedin"></i>',"","https://www.linkedin.com/in/erik-birch-96674618a/"),
    facebook = helperFunctions.generateElement('a',"facebook","",'<i class="fa-brands fa-square-facebook"></i>',"","https://www.facebook.com/profile.php?id=100013516478893"),
    insta = helperFunctions.generateElement('a',"insta","",'<i class="fa-brands fa-square-instagram"></i>',"","https://www.instagram.com/erikqbirch/")
  ){
    // email = helperFunctions.customSpecialElements(email, "erikqbirch@gmail.com");
    // console.log(email);
    linkSection = helperFunctions.appendChildren(linkSection,linkedIn,facebook,insta);
    return linkSection;
  }

}

pageStuff.constructHTML();