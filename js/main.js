'use strict';
// Variable
var currentPageViewed;

// Declarations


// Constants
const homePage = document.getElementById('homePage');
const abPage = document.getElementById('abPage');
const mobileNavBar = document.getElementById('mobileNavBar');
const numberSlideTextBox = document.getElementById('numberSlideTextBox');
const homePageTitle = document.getElementById('homePageTitle');


/*
____________________________________________________________________________________
Functions
____________________________________________________________________________________
*/

function setHeaderHeight() {
  var height = screen.height;
  document.documentElement.style.setProperty("--header-height", height + 'px');
  console.log(height);
}

function swapClass(x, y, z) {
  x = document.getElementById(x);
  x.classList.replace(y, z);
}

function mobileMenuAllowed() {
  if (pageList[0].classList.contains("unactive") == true) {
    mobileNavBar.classList.add("shown");
    mobileNavBar.classList.remove("hidden");
  } else {
    mobileNavBar.classList.add("hidden");
    mobileNavBar.classList.remove("shown");
  }
}

function menuButton(page) {
  let activePage = checkActivePage();
  swapClass(activePage, "active", "unactive")
  swapClass(page, "unactive", "active")
  mobileMenuAllowed();
}

function pageSwap(page) {
  let content = (numberSlideTextBox.value)-1;
  let contentsign = Math.sign(content);
  if (Number.isInteger(content) || contentsign != -1) {
    window.sampleAmmount = content;
    startCompair();
    homePage.classList.add('animate__animated', 'animate__fadeOutUp');
    swapClass("homePage", "active", "unactive");
    homePage.classList.remove('animate__animated', 'animate__fadeOutUp');
    swapClass(page, "unactive", "active");
    page = document.getElementById(page);
    page.classList.add('animate__animated', 'animate__fadeInUp');
    setTimeout(() => {
      page.classList.remove('animate__animated', 'animate__fadeInUp');
    }, 2000);
  } else {
    homePageTitle.innerHTML = "Enter a positive whole number!!"
    setTimeout(() => {
      homePageTitle.innerHTML = "Custome Pairwise Survey"
    }, 2000);
  }
}

/*
____________________________________________________________________________________
Event Listeners


  
____________________________________________________________________________________
*/

