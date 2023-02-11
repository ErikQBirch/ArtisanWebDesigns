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
    h1_tag = helperFunctions.generateElement('h1',"","","About")){
      main_tag = helperFunctions.appendChildren(main_tag, this.hero(), h1_tag, this.about());
    return main_tag;
  },

  about: function(
    div = helperFunctions.generateElement('div', "mainContent"),
    erik = helperFunctions.generateElement('div',"erik"),
    erik_h2 = helperFunctions.generateElement('h2',"","","Erik Q. Birch"),
    erik_p = helperFunctions.generateElement('p',"","","Hi! I live in a world that balances between the intracate power of science and the inspiring wonder of art. I am a web designer. I excel in creation and beautification when it comes to websites and always seek oportuanities to help others with my skills. Whether it's  web designing in and of itself, content copywriting, or obtaining a pressence on social media; this is what I do and have been doing for many years.<br><br>Web design wasn't always something I dreamed about going into. I orignally wanted to be a chemist/chemical engineer. But with no specific vision and a lack of attraction to the nitty-gritty aspects of lab experiments; I decided to change course and look into something different.<br><br>I've always had a thing for art and stories as a kid, but never really pushed myself to get really good at either. So, applying my interest in science and my love for artistry, I choose to become a Web Designer to satisfy both aspects."),
    tripleA = helperFunctions.generateElement('div',"tripleA"),
    tripleA_h2 = helperFunctions.generateElement("h2","","","Triple A"),
    tripleA_p = helperFunctions.generateElement('p',"","","Triple A was a brand idea I had for my own personal endeavors where I supported Artists, Animators, and Authors/Storytellers with my skills as a Web Designer. Reason why I place such an emphasis on building up artistic creators is becasue I believe the world is full of amazing and wonderful imagination! There's so much glorious creativity in the world, but sadly not all of it is wholesome or uplifting.<br><br>For the benefit of my future posterity and the rest of the kids in the world, I want to promote awesome artwork that is used for good! I might lack some abilities and experience in terms of creating my own art, but I sure can build up those who do have those blessings and use them to Light the World!"),
    tripleA_figure = helperFunctions.generateElement('figure'),
    tripleA_img = helperFunctions.generateElement('img',"","","Logo","../assets/resources/imgs/Favicon(TripleA).webp")
  ){
    tripleA_figure.appendChild(tripleA_img);
    erik = helperFunctions.appendChildren(erik, erik_h2,erik_p);
    tripleA = helperFunctions.appendChildren(tripleA,tripleA_h2,tripleA_p,tripleA_figure)
    div = helperFunctions.appendChildren(div, erik, tripleA);
    return div;
  }
}

pageStuff.constructHTML();