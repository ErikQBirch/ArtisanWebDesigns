import { helperFunctions } from "./helperFunctions.js";
import { specialFeatures } from "./specialFeatures.js";

const pageStuff = {
  questions_array: [
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ1.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ2.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ3.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ4.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ5.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ6.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ7.webp"
  ],
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    specialFeatures.carousel.functionality.setUp();
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
    // figure = helperFunctions.generateElement('a',"","","","../assets/resources/ErikQ.Birch_standardResume.pdf"),
    // resume_webp = helperFunctions.generateElement('img',"","","Resume","../assets/resources/imgs/resume.webp"),
   ){
      // main_tag = helperFunctions.nestChildren(main_tag, figure, resume_webp);
      main_tag = helperFunctions.appendChildren(main_tag, this.side1(), this.side2());
    return main_tag;
  },
  side1: function(
    side1_tag = helperFunctions.generateElement('section',"side1"),
    figure = helperFunctions.generateElement('a',"","","","../assets/resources/ErikQ.Birch_standardResume.pdf"),
    resume_webp = helperFunctions.generateElement('img',"","","Resume","../assets/resources/imgs/resume.webp"),
    note = helperFunctions.generateElement('strong','','',"(NOTE: Click/Tap resume to download)")
  ){
    figure = helperFunctions.addHoverTitle(figure, "Click/Tap to download");
    side1_tag = helperFunctions.nestChildren(side1_tag, figure, resume_webp);
    side1_tag.appendChild(note);
    return side1_tag;
  },
  side2: function(
    side2_tag = helperFunctions.generateElement('section',"side2"),
    carousel_organism_variable = specialFeatures.carousel.carousel_organism(pageStuff.questions_array)
    ){
      console.log(carousel_organism_variable)
      side2_tag = helperFunctions.appendChildren(side2_tag, carousel_organism_variable[0], carousel_organism_variable[1])
    return side2_tag;
  },


}

pageStuff.constructHTML();