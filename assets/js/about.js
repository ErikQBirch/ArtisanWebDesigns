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
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/aboutBanner.webp"),
    banner_tag = helperFunctions.generateElement('div', "banner","","I consider myself as a decent human being to say the least...")
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
    erik_p = helperFunctions.generateElement('div',"","",
      `<p>Hi! I live in a world that balances between the intracate power of science and the inspiring wonder of art. I am a web designer. I excel in creation and beautification when it comes to websites and always seek oportuanities to help others with my skills. Whether it's  web designing in and of itself, content copywriting, or obtaining a pressence on social media; this is what I do and have been doing for many years.</p>
      <p>Web design wasn't always something I dreamed about going into. I orignally wanted to be a chemist/chemical engineer. But with no specific vision and a lack of attraction to the nitty-gritty lab experiments; I decided to change course and look into something different.</p>
      <p>I've always had a thing for art and stories as a kid, but never really pushed myself to get really good at either. So, applying my interest in science and my love for artistry, I choose to become a Web Designer to satisfy both aspects.</p>`),
    erik_figure = helperFunctions.generateElement('figure'),
    erik_img = helperFunctions.generateElement('img',"","","Erik","../assets/resources/imgs/me.jpg"),
    tripleA = helperFunctions.generateElement('div',"tripleA"),
    tripleA_h2 = helperFunctions.generateElement("h2","","","Artisan Web Designs"),
    tripleA_p = helperFunctions.generateElement('div',"","",
      `<p>Triple A was a brand idea I had for my own personal endeavors where I supported Artists, Animators, and Authors/Storytellers with my skills as a Web Designer. The reason why I place such an emphasis on building up artistic creators is because I believe the world is full of amazing and wonderful imagination! There's so much glorious creativity in the world, but sadly not all of it is wholesome or uplifting.</p>
      <p>I've been told that focusing on Artists, Animators, and Authors limits my scope and audience; so after some thought, I've decided to change the name to <b>Artisan Web Designs</b> (mostly to keep the logo idea). Art comes in a variety of different forms and flavors, and web desiging is one of them.</p>
      <p>For the benefit of my future posterity and the rest of the kids in the world, I want to promote awesome artwork that is used for good! I might lack some abilities and experience in terms of creating my own art, but I sure can build up those who do have those blessings and use them to Light the World!</p>`),
    tripleA_figure = helperFunctions.generateElement('figure'),
    tripleA_img = helperFunctions.generateElement('img',"","","Logo","../assets/resources/imgs/ArtisanWebDesignLogo.webp")
  ){
    tripleA_figure.appendChild(tripleA_img);
    erik_figure.appendChild(erik_img);
    erik = helperFunctions.appendChildren(erik, erik_h2,erik_p, erik_figure);
    tripleA = helperFunctions.appendChildren(tripleA,tripleA_h2,tripleA_p,tripleA_figure)
    div = helperFunctions.appendChildren(div, erik, tripleA);
    return div;
  }
}

pageStuff.constructHTML();