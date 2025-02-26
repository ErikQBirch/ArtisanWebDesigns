import { helperFunctions } from "./helperFunctions.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
  },
  email_form: function(
    contact_container = helperFunctions.generateElement('div',"","contact-container"),
    contact_form = helperFunctions.generateElement('form',"","contact-form","","https://api.web3forms.com/submit"),
    // contact_title_holder = helperFunctions.generateElement('div',"","contact-title-holder"),
    // h2=helperFunctions.generateElement('h2',"","","Reach Out Via Email"),
    hiddenInput = helperFunctions.generateElement('input',"access_key","hidden"),
    textInput = helperFunctions.generateElement('input',"name","text","Your Name"),
    emailInput = helperFunctions.generateElement('input',"email","email","Your Email"),
    messageTextarea = helperFunctions.generateElement('textarea',"message","","Your Message"),
    submitButton = helperFunctions.generateElement('button',"","submit","Send")
  ){
    // contact_container = helperFunctions.nestChildren(contact_container, contact_form, contact_title_holder, h2);
    contact_container.appendChild(contact_form);
    contact_form = helperFunctions.appendChildren(contact_form,hiddenInput,textInput,emailInput,messageTextarea,submitButton)
    hiddenInput.setAttribute('value',"a1b7999a-d110-4b8e-9dc4-e4c2ef7309ef");

    return contact_container;
  },
  hero: function(
    hero_tag = helperFunctions.generateElement('div',"hero"),
    figure_tag = helperFunctions.generateElement('figure'),
    img_tag = helperFunctions.generateElement('img',"","","","../assets/resources/imgs/heroPics/hero7.webp"),
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
      main_tag = helperFunctions.appendChildren(main_tag, this.hero(), h1_tag, this.email_form(), this.links());
    return main_tag;
  },
  links: function(
    contentHolder = helperFunctions.generateElement('div',"contentHolder"),
    email = helperFunctions.generateElement('a',"email","email",'<i class="fa-solid fa-square-envelope"></i>',"mailto:erikqbirch@gmail.com"),
    linkedIn = helperFunctions.generateElement('a',"linkedIn","",'<i class="fa-brands fa-linkedin"></i>',"https://www.linkedin.com/in/erik-birch-96674618a/"),
    facebook = helperFunctions.generateElement('a',"facebook","",'<i class="fa-brands fa-square-facebook"></i>',"https://www.facebook.com/profile.php?id=100013516478893"),
    insta = helperFunctions.generateElement('a',"insta","",'<i class="fa-brands fa-square-instagram"></i>',"https://www.instagram.com/erikqbirch/")
  ){
    email = helperFunctions.customSpecialElements(email, "erikqbirch@gmail.com");
    console.log(email);
    contentHolder = helperFunctions.appendChildren(contentHolder, email,linkedIn,facebook,insta);
    return contentHolder;
  }

}

pageStuff.constructHTML();