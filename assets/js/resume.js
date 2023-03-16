import { helperFunctions } from "./helperFunctions.js";
import { skillDB } from "../resources/skillDB.js";

const pageStuff = {
  questions_array: [
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ1.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ2.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ3.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ4.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ5.webp",
    "assets/resources/imgs/previewPics/InterviewQuestions/IQ6.webp"
  ],
  carousel: {
    carousel_organism: function(
      counter = 0,
      imgArray = pageStuff.questions_array,
      carousel_tag = helperFunctions.generateElement('div',"carousel"),
      slideHolder = helperFunctions.generateElement('div',"slideHolder"),
      slideControls = this.carousel_slideControls(),
      carousel_nav = helperFunctions.generateElement('div', "carousel_nav"),
      carousel_note = helperFunctions.generateElement('span',"carousel_note","","Click/Tap to enlarge")
    ){
      // console.log(imgArray);
      imgArray.forEach(img => {
        let slide = this.carousel_singleSlide(img, counter);
        slideHolder.appendChild(slide);
        carousel_nav = this.carousel_navBtns(carousel_nav, counter);
        counter++;
        
      });
  
      carousel_tag = helperFunctions.appendChildren(carousel_tag, slideHolder,slideControls)
      let carousel = [carousel_tag, carousel_nav, carousel_note];
      return carousel;
  
    },
    carousel_navBtns: function(
      navBtns,
      counter,
      slideBtn = helperFunctions.generateElement('button',`${counter}`,"slideBtn","<i class='fa-solid fa-circle'></i>") 
    ){
      navBtns.appendChild(slideBtn);
      return navBtns;
    },
    carousel_slideControls: function(
      slideControls = helperFunctions.generateElement('div',"slideControls"),
      prevBtn = helperFunctions.generateElement('button',"prevBtn","shiftBtn","<i class='fa-solid fa-caret-left'></i>"),
      nextBtn = helperFunctions.generateElement('button',"nextBtn","shiftBtn","<i class='fa-solid fa-caret-right'></i>")
    ){
      slideControls = helperFunctions.appendChildren(slideControls, prevBtn, nextBtn);
      return slideControls;
    },
    carousel_singleSlide: function(
      imgPath,
      counter,
      figure = helperFunctions.generateElement('figure',`slide${counter}`, "slide"),
      img = helperFunctions.generateElement('img',"","","carouselImg",`../${imgPath}`)){
        figure.appendChild(img);
        return figure;
    },
    functionality: {
      index: 1,
      intervalFunction: 0,
      interval: 5000,
      assignCurrentSlide: function(
        centerSlide, formerSlide, slideArray
      ){
        let target;
        document.querySelector(".currentBtn").classList.remove('currentBtn');
        formerSlide.classList.remove('currentSlide');
        
        if (centerSlide.id == "firstClone"){slideArray[1].classList.add('currentSlide')}
        else if (centerSlide.id == "lastClone"){slideArray[slideArray.length - 2].classList.add('currentSlide')}
        else { centerSlide.classList.add('currentSlide')};

        target = document.querySelector('.currentSlide');
        document.getElementById(target.id.substring(5,6)).classList.add('currentBtn');
        
      },
      getSlides: function(){return document.querySelectorAll('.slide')},
      moveToNextSlide: function(slideHolder, slideWidth){
        let slideArray = this.getSlides();
        if (this.index >= (slideArray.length-1)){return};
        
        this.index++;
        this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray);
        
        slideHolder.style.transform = `translate(${-slideWidth*this.index}px)`;
        slideHolder.style.transition = '0.75s';
      },
      moveToPrevSlide: function(slideHolder, slideWidth){
        let slideArray = this.getSlides();
        if (this.index <= 0){return};
        this.index--;
        
        this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray);
        slideHolder.style.transform = `translate(${-slideWidth*this.index}px)`;
        slideHolder.style.transition = '0.75s';
      },
      previewCurrentSlide: function(
        imgPath,
        main = document.querySelector('main'),
        section = helperFunctions.generateElement('section',"preview"),
        figure = helperFunctions.generateElement('figure'),
        img = helperFunctions.generateElement('img',"","","",imgPath),
        note = helperFunctions.generateElement('span',"","","Click/Tap anywhere to close")
      ){
        main = helperFunctions.nestChildren(main, section,figure,img);
        section.appendChild(note);
        section.addEventListener('click',()=>{
          section.remove();
        })
        console.log(imgPath);
      },
      setUp: function(
        carousel = document.getElementById('carousel'),
        slideHolder = document.getElementById('slideHolder'),
        prevBtn = document.getElementById('prevBtn'),
        nextBtn = document.getElementById('nextBtn'),
        slideArray = this.getSlides(),
        firstClone = slideArray[0].cloneNode(true),
        lastClone = slideArray[slideArray.length-1].cloneNode(true),
        slideWidth = slideArray[this.index].clientWidth,
        slideNav_array = document.querySelectorAll('.slideBtn')
      ){
        firstClone.id = "firstClone";
        lastClone.id = "lastClone";
        slideHolder.append(firstClone);
        slideHolder.prepend(lastClone);
        slideArray[0].classList.add('currentSlide');
        slideNav_array[0].classList.add('currentBtn');
        slideHolder.style.transform = `translateX(${-slideWidth * this.index}px)`;
        this.startSlides(slideHolder, slideWidth);
        this.theEvents(carousel, slideHolder,nextBtn,prevBtn,slideWidth,slideNav_array)

      },
      startSlides: function(slideHolder, slideWidth){
        this.intervalFunction = setInterval(()=>{
          this.moveToNextSlide(slideHolder,slideWidth);
        }, this.interval);
        return;
      },
      theEvents: function(carousel, slideHolder,nextBtn,prevBtn, slideWidth, slideNav_array){
        slideHolder.addEventListener('transitionend',()=>{
          let slideArray = this.getSlides();
          
          if (slideArray[this.index].id == firstClone.id){
            slideHolder.style.transition = "none";
            this.index = 1;
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
          }
          if (slideArray[this.index].id == lastClone.id){
            slideHolder.style.transition = "none";
            this.index = slideArray.length - 2;
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
          }
        })
        slideHolder,addEventListener('click',(e)=>{
          if (e.target.id == "slideControls"){
            let currentSlide = document.querySelector('.currentSlide');
            let currentImg = currentSlide.children[0].src;
            this.previewCurrentSlide(currentImg);
          }
        })
        carousel.addEventListener('mouseenter',()=>{
          
          clearInterval(this.intervalFunction);
        })
        carousel.addEventListener('mouseleave', ()=>{
          this.startSlides(slideHolder,slideWidth)
        });
        
        nextBtn.addEventListener('click',()=>{this.moveToNextSlide(slideHolder, slideWidth)});
        prevBtn.addEventListener('click',()=>{this.moveToPrevSlide(slideHolder, slideWidth)});
        for (let slideBtn of slideNav_array){
          slideBtn.addEventListener('click',()=>{
            let slideArray = this.getSlides();
            this.index = parseFloat(slideBtn.id) + 1;
            this.assignCurrentSlide(slideArray[this.index], document.querySelector('.currentSlide'),slideArray)
            slideHolder.style.transform = `translateX(${-slideWidth * this.index}px`;
            slideHolder.style.transition = '0.75s';
          })
        }
      },
    },
    
  },
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    this.carousel.functionality.setUp();
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
    figure = helperFunctions.addHoverTitle(figure, "Click to download");
    side1_tag = helperFunctions.nestChildren(side1_tag, figure, resume_webp);
    side1_tag.appendChild(note);
    return side1_tag;
  },
  side2: function(
    side2_tag = helperFunctions.generateElement('section',"side2"),
    carousel_organism = this.carousel.carousel_organism()
    ){
    side2_tag = helperFunctions.appendChildren(side2_tag, carousel_organism[0], carousel_organism[1], carousel_organism[2])
    return side2_tag;
  },


}

pageStuff.constructHTML();