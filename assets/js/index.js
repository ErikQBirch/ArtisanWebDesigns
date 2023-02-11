import { helperFunctions } from "./helperFunctions.js"
import { navigation } from "./navigation.js";
const pageStuff = {
  constructHTML: function(
    body = document.querySelector('body')
  ){
    body = helperFunctions.appendChildren(body, 
      this.header(),
      this.footer());
    navigation.postConstructionFunctions();
    this.scrollEvents.headerScroll();
    this.favicon();
  },
  header: function(
    header_tag = helperFunctions.generateElement('header')
  ){
    let navigationPackage = navigation.getNavigationPackage();
    header_tag = helperFunctions.appendChildren(
      header_tag, 
      navigationPackage[0],
      navigationPackage[1], 
      navigationPackage[2],
      navigationPackage[3]);
    return header_tag;
  },
  fillerContent: function(){
    let stuff = helperFunctions.generateElement('main',"","",
    "STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>\
    STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>\
    STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>\
    STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>\
    STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>STUFF<br>");
    return stuff;
  },
  favicon: function(
    favicon = document.querySelector("link[rel~='icon']"),
    pathAdjuster = helperFunctions.getPathAdjuster(navigation.pageList)
  ){ 
    // console.log("favicon",favicon);
    // console.log(pathAdjuster);
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(favicon);
    }
    favicon.href = `${pathAdjuster[0]}assets/resources/imgs/TripleA.ico`;
    // console.log(favicon);
  },
  footer: function(
    footer_tag = helperFunctions.generateElement('footer'),
    text = helperFunctions.generateElement('p',"","","Erik Q. Birch | ©2023 | TripleA™")
  ){
    footer_tag.appendChild(text);
    return footer_tag;
  },
  scrollEvents:{
    headerScroll: function(
      header_tag = document.querySelector('header'),
      sideMenu = document.querySelector('#sideMenu')
    ){
      // console.log(header_tag);
      let currentScroll = 0;
      window.onscroll = function(e){
        let nextScroll = window.scrollY;
        if (nextScroll > currentScroll){
          if (window.innerWidth > 992){
            header_tag.style.top = "-6rem";
          }
        }
        else {
          header_tag.style.top = "0rem";
        }
        currentScroll = nextScroll;
      }
    }
  }
}

pageStuff.constructHTML();