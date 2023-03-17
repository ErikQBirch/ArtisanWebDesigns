import { helperFunctions } from "./helperFunctions.js";
import { allProjects_DB } from "../resources/allProjects_DB.js";

const pageStuff = {
  carousel: {
    carousel_organism: function(
      prevObj,
      counter = 0,
      imgArray = prevObj.preview.carouselImgs,
      carousel_tag = helperFunctions.generateElement('div',"carousel"),
      slideHolder = helperFunctions.generateElement('div',"slideHolder"),
      slideControls = this.carousel_slideControls(),
      carousel_nav = helperFunctions.generateElement('div', "carousel_nav"),
      carousel_note = helperFunctions.generateElement('span',"carousel_note","","Click/Tap to enlarge")
    ){
      
      imgArray.forEach(img => {
        let slide = this.carousel_singleSlide(img, counter);
        slideHolder.appendChild(slide);
        carousel_nav = this.carousel_navBtns(carousel_nav, counter);
        counter++;
        
      });
  
      carousel_tag = helperFunctions.appendChildren(carousel_tag, slideHolder,slideControls)
      let carousel = [carousel_tag,carousel_nav, carousel_note];
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
      // touchstartX : 0,
      // touchendX : 0,
      // checkDirection: function() {
      //   if (functionality.touchendX < functionality.touchstartX) alert('swiped left!')
      //   if (functionality.touchendX > functionality.touchstartX) alert('swiped right!')
      // },


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
      startSlides: function(slideHolder, slideWidth){
        this.intervalFunction = setInterval(()=>{
          this.moveToNextSlide(slideHolder,slideWidth);
        }, this.interval);
        return;
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
        });
        slideHolder,addEventListener('click',(e)=>{
          if (e.target.id == "slideControls"){
            let currentSlide = document.querySelector('.currentSlide');
            let currentImg = currentSlide.children[0].src;
            this.previewCurrentSlide(currentImg);
          }
        })

        // slideHolder.addEventListener('touchstart', e => {
        //   functionality.touchstartX = e.changedTouches[0].screenX;
        //   document.querySelector('main').style.backgroundColor = "blue";
        // })
        
        // slideHolder.addEventListener('touchend', e => {
        //   functionality.touchendX = e.changedTouches[0].screenX
        //   functionality.checkDirection();
        //   document.querySelector('main').style.backgroundColor = "red";
        // })

        carousel.addEventListener('mouseenter',()=>{
          
          clearInterval(this.intervalFunction);
        });
        carousel.addEventListener('mouseleave', ()=>{
          this.startSlides(slideHolder,slideWidth)
        });
        nextBtn.addEventListener('click',()=>{this.moveToNextSlide(slideHolder, slideWidth)});
        prevBtn.addEventListener('click',()=>{this.moveToPrevSlide(slideHolder, slideWidth)});
        for (let slideBtn of slideNav_array){
          // console.log(slideBtn);
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
  getNewID_string: function(newID_string){
    switch(newID_string.length){
      case 1:
        newID_string = `00${newID_string}`;
        break;
      case 2:
        newID_string = `0${newID_string}`;
        break;
      case 3:
        newID_string = `${newID_string}`
        break;
      default:
        newID_string = `00${newID_string}`;
        break; 
    }
    return newID_string;
  },
  getNextProject: function(
    ID,
    newID = parseFloat(ID)+1,
    max = Object.keys(allProjects_DB).length,
    action = "Next"
  ){
    if (newID > max){
      newID == 1;
    };
    return this.getProjectPath(newID.toString(), action);
  },
  getPreviewObject: function(
    url = window.location.href,
    id = url.slice(url.length-3, url.length)
  ){
    // console.log(id)
    let prevObj;
    for (let x in allProjects_DB){
      if (allProjects_DB[x].id == id){
        prevObj = allProjects_DB[x];
      }
    }
    return prevObj;
  },
  getPreviousProject: function(
    ID,
    newID = parseFloat(ID)-1,
    action = "Previous"
    ){
    if (newID < 1){
      newID = Object.keys(allProjects_DB).length;
    }
    return this.getProjectPath(newID.toString(), action)
  },
  getProjectPath: function(
    newID_string,
    action,
    projectTitle = "",
    newPath = "",
  ){
    newID_string = this.getNewID_string(newID_string);
    
    projectTitle = `project${newID_string}`;
    if (allProjects_DB[projectTitle].name == "About"){
      if(action == "Previous"){
        newID_string = (parseFloat(newID_string)-1).toString()
        newID_string = this.getNewID_string(newID_string);
      }
      else if (action == "Next"){
        newID_string = (parseFloat(newID_string)+1).toString()
        newID_string = this.getNewID_string(newID_string);
      }
    }
    projectTitle = `project${newID_string}`;
    newPath  = `../pages/preview.html?id=${newID_string}`;

    if (allProjects_DB[projectTitle].name == "Empty Slot"){
      newPath  = "../pages/deadEnd.html";
    } 
    let newLink = helperFunctions.generateElement('a',"","",`${action}<br>Project`,newPath);
    return newLink;
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
    side1_tag = helperFunctions.generateElement('section',"side1"),
    carousel_organism = this.carousel.carousel_organism(prevObj)
    ){
    side1_tag = helperFunctions.appendChildren(side1_tag, carousel_organism[0], carousel_organism[1], carousel_organism[2])
    return side1_tag;
  },
  side2(
    prevObj,
    side2_tag = helperFunctions.generateElement('section',"side2"),
    info_tag = helperFunctions.generateElement('div',"infoTag"),
    name = helperFunctions.generateElement('h1',"","", `${helperFunctions.removeBRelement(prevObj.name)}`),
    year = helperFunctions.generateElement('span',"","",prevObj.preview.year),
    descript = helperFunctions.generateElement('p',"","",prevObj.preview.description),
    btnHolder = this.side2_btnHolder(prevObj)
  ){
    
    
    info_tag = helperFunctions.appendChildren(info_tag, name, year, descript, btnHolder);
    side2_tag.appendChild(info_tag);

    return side2_tag;
  },
  side2_btnHolder: function(
    prevObj,
    ID = prevObj.id,
    socialBtn = helperFunctions.generateElement('a',"","","About Client",`${prevObj.preview.socialPath}`),
    siteBtn = helperFunctions.generateElement('a',"","","View Site",`${prevObj.preview.sitePath}`),
    returnBtn = helperFunctions.generateElement('a',"","","Return","../"),
    previousProject = this.getPreviousProject(ID),
    nextProject = this.getNextProject(ID),
    btnHolder = helperFunctions.generateElement('div',"btnHolder"),
  ){
    btnHolder = helperFunctions.appendChildren(btnHolder, previousProject, socialBtn, siteBtn, returnBtn, nextProject);
    // PreviousProject = helperFunctions.generateElement('a',"","","Previous<br>Project",`pages/preview.html?id=${001}`)
    console.log(ID.length)
    console.log(parseFloat(ID));
    return btnHolder;

  }
}

pageStuff.constructHTML();
// document.querySelector('main').style.backgroundColor = "yellow";
