import { helperFunctions } from "./helperFunctions.js"

export const navigation = {
  pageList: ["about","preview","resume","contact","skills","deadEnd"],
  pathAdjuster: [],
  currentPage:  "",
  extraNav_molecule: function(
    extraNav = helperFunctions.generateElement('a',"extraNav","","Web Design | Content Creation | Social Media",`${this.pathAdjuster[1]}skills.html`)
  ){
    return extraNav;
  },
  getNavigationPackage: function(){
    this.setGlobalVariables();
    let moleculePackage = [
      this.logo_molecule(),
      this.hamburger_atom(),
      this.sideNav_molecule(),
      this.nav_molecule()
    ]
    return moleculePackage;
  },
  hamburger_atom:function(
    menuBtn = helperFunctions.generateElement('div',"menu-btn","menu-btn"),
    burger = helperFunctions.generateElement('span',"","burger")
  ){
    menuBtn.appendChild(burger);
    return menuBtn;
  },
  // labelMainNav: function(
  //   header = document.querySelector('header'),
  //   mainNav = header.children[header.children.length - 1]
  // ){
  //   mainNav.id = "mainNav";
  // },
  logo_molecule: function(
    div = helperFunctions.generateElement('div',"logoArea"),
    a_tag = helperFunctions.generateElement('a',"logoLink","","",`${this.pathAdjuster[0]}`),
    img_tag = helperFunctions.generateElement('img',"","","logo",`${this.pathAdjuster[0]}assets/resources/imgs/logo1.webp`)
  ){
    div = helperFunctions.appendChildren(div, a_tag, this.extraNav_molecule());
    a_tag.appendChild(img_tag);
    return div;
  },
  nav_molecule:function(
    navOptions = ["Portfolio","Skills","About","Resume","Contact"],
    nav_tag = helperFunctions.generateElement('nav','mainNav'),
    ul_tag = helperFunctions.generateElement('ul'))
  {
    navOptions.forEach(opt => {
      let li_tag = helperFunctions.generateElement('li');
      let a_tag;
      // console.log(this.currentPage);
      if (opt.toLocaleUpperCase() == this.currentPage.toUpperCase()){
        a_tag = helperFunctions.generateElement('a',"","current",opt,`${this.pathAdjuster[1]}${opt.toLowerCase()}.html`);
      }
      else{
        a_tag = helperFunctions.generateElement('a',"","",opt,`${this.pathAdjuster[1]}${opt.toLowerCase()}.html`);
      }
      if (opt == "Portfolio"){
        a_tag = helperFunctions.generateElement('a',"","",opt,`${this.pathAdjuster[0]}`);
        if(this.currentPage == 'index'){
          a_tag.classList.add('current');
        } 
      }
      
      ul_tag = helperFunctions.nestChildren(ul_tag, li_tag, a_tag);
    });
    nav_tag.appendChild(ul_tag);
    return nav_tag;
  },
  postConstructionFunctions: function(){
    this.sideNav_events();
    // this.labelMainNav();
  },
  setGlobalVariables: function(){
    this.currentPage = helperFunctions.getCurrentPage(this.pageList);
    this.pathAdjuster = helperFunctions.getPathAdjuster(this.pageList); 
  },
  sideNav_molecule: function(
    sideNav_tag = helperFunctions.generateElement('section',"sideMenu"),
    // menuBtn = this.hamburger_atom(),
    nav = this.nav_molecule(),
    void_tag = helperFunctions.generateElement('div',"","void")
  ){
    sideNav_tag = helperFunctions.appendChildren(sideNav_tag, nav, void_tag);
    // nav.insertBefore(menuBtn, nav.children[0]);
    nav.id = "sideNav";
    return sideNav_tag;
  },
  sideNav_events: function(
    body_tag = document.querySelector('body'),
    menuBtn = document.querySelector(".menu-btn"),
    sideMenu = document.querySelector('#sideMenu'),
    voidElement = document.querySelector('.void')
  ){
    let menuOpen = false;
    // console.log(main_tag)
    menuBtn.addEventListener('click',() => {
      if (!menuOpen){
        sideMenu.classList.add('open');
        menuBtn.classList.add('open');
        body_tag.classList.add('blur'),
        menuOpen = true;
      } else {
        sideMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        body_tag.classList.remove('blur'),
        menuOpen = false;
      }
    })
    document.addEventListener('keydown', (event) => {
      if (menuOpen && event.key == "Escape"){
        sideMenu.classList.remove('open');
        menuOpen = false;
      }
    })
    voidElement.addEventListener('click',() => {
      if (menuOpen){
        sideMenu.classList.remove('open');
        menuOpen = false;
      }
    })

  }
}