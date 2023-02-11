export const helperFunctions = {
  appendChildren: function (parent, ...elementChildren) {
    for (let i in elementChildren) {
      parent.appendChild(elementChildren[i]);
    }
    return parent;
  },
  customSpecialElements: function (element, ...extraAttributes) { //CLONE?
    switch (element.classList.value) {
      case 'video':
        element.setAttribute('autoplay', 'autoplay');
        element.setAttribute('loop', true);
        element.muted = 'muted';
        break;
      case 'thumbnail':
        element.setAttribute('src',"../assets/resources/imgs/placeholder.jpg");
        element.setAttribute('data-src', extraAttributes[0]);
        element.setAttribute('alt',extraAttributes[1]);
        break;
      case 'email':
        console.log(element);
        element.setAttribute('href',"#/");
        navigator.clipboard.writeText(extraAttributes[0]);
        element.addEventListener('click',()=>{
          alert("Copied the text: " + extraAttributes[0]);
        })
        break;

    }
    return element;
  },
  generateElement: function (
    paramElement,
    paramId = '',
    paramClass = '',
    paramText = '',
    paramLink = ''
  ) {
    let element = document.createElement(paramElement);
    element.id = paramId;
    element.setAttribute('class', paramClass);
    switch (paramElement) {
      case 'img':
        element.setAttribute('src', paramLink);
        element.setAttribute('alt', paramText);
        break;
      case 'a':
        element.setAttribute('href', paramLink);
        break;
      case 'button':
      case 'btn':
        if (paramLink){
          element.addEventListener('click',()=>{
            console.log(window.location.href);
            window.location.replace(paramLink);
          })
        }
      case 'input':
        element.setAttribute('type', paramClass);
        element.setAttribute('name', paramId);
      case 'source':
        element.setAttribute('src', paramLink);
        element.setAttribute('type', paramClass);
      default:
        break;
    }
    if (paramText != '') {
      element.innerHTML = paramText;
    }
    return element;
  },
  getCurrentPage: function(
    pageList,
    url = window.location.href
  ){
    let option = "index";
    pageList.forEach(opt => {
      if (url.includes(opt)){
        option = opt;
        return option;
      }
    });
    return option;
  },
  getPathAdjuster: function(
    pageList,
    url = window.location.href,
    isIndex = true,
    pathAdjuster = ["","pages/"]
  ){
    pageList.forEach(page => {
      if (url.includes(page)){
        isIndex = false;
      }
    });

    if (isIndex == false){
      pathAdjuster = ["../",""];
    }
    // console.log(pathAdjuster);
  return pathAdjuster;
  },
  lazyLoading: function(
    imagesToLoad = document.querySelectorAll('img[data-src]'), //images elements with the attribute "data-src"; similar to css #data-src or .data-src
    loadImages = (img) => {
      img.setAttribute('src', img.getAttribute('data-src'));
      img.onload = () => {
        img.removeAttribute('data-src');
      }
    },
    imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px -200px 0px" //make bottom positive so images load before entering screen;
    },
  ){
    //imagesToLoad - 
    //loadImages - 
    //imgOptions - 
    //Step1 - 
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
          if(item.isIntersecting) {
            loadImages(item.target);
            observer.unobserve(item.target);
          }
        });
      }, imgOptions);
      imagesToLoad.forEach((img) => {
        observer.observe(img);
      });
    } else {
      imagesToLoad.forEach((img)=> {
        loadImages(img);
      });
    }
  },
  nestChildren: function(parent, ...elementChildren){
    // console.log(elementChildren)
    parent.appendChild(elementChildren[0]);
    for (let i=1; i<elementChildren.length; i++){
        elementChildren[i-1].appendChild(elementChildren[i]);
    }
    return parent;
  },
  removeBRelement: function (text){
    while (text.indexOf("<br>") != -1){
      text = text.replace("<br>"," ");
    }
    return text;
  },
}