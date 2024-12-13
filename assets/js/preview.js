import { helperFunctions } from "./helperFunctions.js";
import { allProjects_DB } from "../resources/allProjects_DB.js";
import { specialFeatures } from "./specialFeatures.js";

const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body'),
    footer = document.querySelector('footer')
  ){
    body.insertBefore(this.main(), footer);
    
    specialFeatures.carousel.functionality.setUp();
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
    // url = window.location.href,
    // id = url.slice(url.length-3, url.length),
    urlParam = new URLSearchParams(window.location.search),
    id = parseFloat(urlParam.get('id'))
  ){
    console.log(urlParam);
    console.log(urlParam.get('id'));
    let prevObj;
    for (let x in allProjects_DB){
      if (allProjects_DB[x].id == id){
        prevObj = allProjects_DB[x];
      }
    }
    console.log(prevObj);
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
    let newLink = helperFunctions.generateElement('a',"","",`${action}<br> Project`,newPath);
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
    carousel_organism_variable = specialFeatures.carousel.carousel_organism(prevObj.preview.imgUplinePath, prevObj.preview.carouselImgs)
    ){
    // side1_tag = helperFunctions.appendChildren(side1_tag, carousel_organism_variable[0], carousel_organism_variable[1], carousel_organism_variable[2])
    side1_tag = helperFunctions.appendChildren(side1_tag, carousel_organism_variable[0], carousel_organism_variable[1])
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
    
    
    info_tag = helperFunctions.appendChildren(info_tag, name, year, descript);
    side2_tag = helperFunctions.appendChildren(side2_tag, info_tag, btnHolder);

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
    btnHolder = helperFunctions.appendChildren(btnHolder, returnBtn, socialBtn, siteBtn, previousProject, nextProject);
    // PreviousProject = helperFunctions.generateElement('a',"","","Previous<br>Project",`pages/preview.html?id=${001}`)
    return btnHolder;

  }
}

pageStuff.constructHTML();
// document.querySelector('main').style.backgroundColor = "yellow";
