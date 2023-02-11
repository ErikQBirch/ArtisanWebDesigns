import { helperFunctions } from "./helperFunctions.js";
import { previewDB } from "../resources/previewDB.js";

const pageStuff = {
  carousel: {
    carousel_organism: function(
      prevObj,
      counter = 0,
      imgArray = prevObj.preview.carouselImgs,
      carousel_tag = helperFunctions.generateElement('div',"carousel"),
      slideHolder = helperFunctions.generateElement('div',"slideHolder"),
      carousel_nav = helperFunctions.generateElement('div', "carousel_nav")
    ){
      
      imgArray.forEach(img => {
        let slide = this.carousel_singleSlide(img, counter);
        slideHolder.appendChild(slide);
        let slideBtn = helperFunctions.generateElement('div',`${counter}`,"slideBtn","<i class='fa-solid fa-circle'></i>") 
        carousel_nav.appendChild(slideBtn);
        counter++;
        
      });
  
      // carousel_tag.appendChild(slideHolder);
      carousel_tag = helperFunctions.appendChildren(carousel_tag, slideHolder,this.carousel_slideControls())
      let carousel = [carousel_tag,carousel_nav];
      return carousel;
  
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
      getSlides: function(){return document.querySelectorAll('.slide')},
      startSlides: function(slideHolder, slideWidth){
        this.intervalFunction = setInterval(()=>{
          this.moveToNextSlide(slideHolder,slideWidth);
        }, this.interval);
        return;
      },
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
      assignCurrentSlide: function(
        centerSlide, formerslide, slideArray
      ){
        let target;
        document.querySelector(".currentBtn").classList.remove('currentBtn');
        formerslide.classList.remove('currentSlide');
        
        if (centerSlide.id == "firstClone"){slideArray[1].classList.add('currentSlide')}
        else if (centerSlide.id == "lastClone"){slideArray[slideArray.length - 2].classList.add('currentSlide')}
        else { centerSlide.classList.add('currentSlide')};

        target = document.querySelector('.currentSlide').id;
        document.getElementById(target.substring(5,6)).classList.add('currentBtn');
        
      },
      theEvents : function(carousel, slideHolder,nextBtn,prevBtn, slideWidth, slideNav_array){
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
        carousel.addEventListener('mouseenter',()=>{
          
          clearInterval(this.intervalFunction);
        })
        carousel.addEventListener('mouseleave', ()=>{
          this.startSlides(slideHolder,slideWidth)
        });
        
        nextBtn.addEventListener('click',()=>{this.moveToNextSlide(slideHolder, slideWidth)});
        prevBtn.addEventListener('click',()=>{this.moveToPrevSlide(slideHolder, slideWidth)});
        for (let slideBtn of slideNav_array){
          console.log(slideBtn);
          slideBtn.addEventListener('click',()=>{
            console.log("HELLOW")
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
    // this.getPreviewObject();
    
    this.carousel.functionality.setUp();
  },
  getPreviewObject: function(
    url = window.location.href,
    id = url.slice(url.length-2, url.length)
  ){
    let prevObj;
    for (let x in previewDB){
      if (previewDB[x].id == id){
        prevObj = previewDB[x];
      }
    }
    return prevObj;
  },
  description: function(
    
  ){
    

  },
  

  

  main: function(
    main_tag = helperFunctions.generateElement('main'),
    prevObj = this.getPreviewObject()
    ){
      main_tag = helperFunctions.appendChildren(main_tag, this.side1(prevObj), this.side2(prevObj))
      return main_tag;
    },
    

  side1: function(
    prevObj,
    side1_tag = helperFunctions.generateElement('div',"side1"),
    carousel_organism = this.carousel.carousel_organism(prevObj)
    ){
    side1_tag = helperFunctions.appendChildren(side1_tag, carousel_organism[0], carousel_organism[1])
    return side1_tag;
  },
  side2(
    prevObj,
    side2_tag = helperFunctions.generateElement('div',"side2"),
    info_tag = helperFunctions.generateElement('div',"infoTag"),
    name = helperFunctions.generateElement('h1',"","", `${helperFunctions.removeBRelement(prevObj.name)}`),
    year = helperFunctions.generateElement('span',"","",prevObj.preview.year),
    descript = helperFunctions.generateElement('p',"","",prevObj.preview.description),
    btnHolder = helperFunctions.generateElement('div',"btnHolder"),
    siteBtn = helperFunctions.generateElement('a',"","","View Site",`${prevObj.preview.sitePath}`),
    returnBtn = helperFunctions.generateElement('a',"","","Return","../")
  ){
    btnHolder = helperFunctions.appendChildren(btnHolder, siteBtn, returnBtn);
    info_tag = helperFunctions.appendChildren(info_tag, name, year, descript, btnHolder);
    side2_tag.appendChild(info_tag);
    return side2_tag;
  },
}

pageStuff.constructHTML();
