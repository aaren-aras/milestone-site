/* Navbar Responsive Menu */ 
const burgerBtnElement = document.querySelector('.burger-btn');
const navElement = document.querySelector('nav');
const anchorTags = navElement.querySelectorAll('a');
let showMenu = false;

if (window.innerWidth < 768) hideNav(); // Initial state 

burgerBtnElement.addEventListener('click', (e) => {
  // Stops ln 19-24 when burger button is clicked 
  e.stopPropagation();
  toggleMenu();
});

document.body.addEventListener('click', () => {
  // if (showMenu) toggleMenu();
  if (showMenu) {
    navElement.classList.remove('js-open-nav');
    hideNav();
    showMenu = false;
  } else return;
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      navElement.classList.remove('js-open-nav');
      // hideNav();
      showMenu = false;
    }
});

function toggleMenu() {
  if (!showMenu) {
    navElement.classList.add('js-open-nav');
    showNav();
    showMenu = true;
  } 
  else {
    navElement.classList.remove('js-open-nav');
    hideNav();
    showMenu = false;
  }
}

function hideNav() {
  anchorTags.forEach((anchor) => {
    anchor.style.display = 'none';
  });
}

function showNav() {
  anchorTags.forEach((anchor) => {
    anchor.style.display = 'flex';
  });
}

/* Navbar Jump Links (JS alternative) */
document.querySelector('.js-about').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: 0});
});

document.querySelector('.js-projects').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo(0, 900);
});

document.querySelector('.js-contact').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({top: document.body.scrollHeight});
});

/* Header Background (when scrolling) */
addHeaderBkgd();
window.addEventListener('resize', addHeaderBkgd);
function addHeaderBkgd() {
    if (window.innerWidth >= 768) {
        const headerElement = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 30) headerElement.classList.add('js-header-bkgd');
            else headerElement.classList.remove('js-header-bkgd');
        });    
    } else return;
} 

/* About Us - Accordion and Dropdowns */
document.addEventListener('DOMContentLoaded', () => {
  const accordionSections = document.querySelectorAll('.js-accordion');
  const dropdownSections = document.querySelectorAll('.js-dropdown');

  accordionSections.forEach((section) => {
    section.addEventListener('click', () => {
      section.classList.toggle('js-open-accordion');

      const icon = section.querySelector('i.fa-solid');
      if (icon) {
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-down');
      }
    })
  });

  dropdownSections.forEach((section) => {
    section.addEventListener('click', () => {
      section.classList.toggle('js-open-dropdown'); 

      const icon = section.querySelector('i.fa-solid');
      if (icon) {
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-down');
      }
    })
  });
}); 

/* Footer Date Update */ 
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.querySelector('.js-current-year');
  const currentYear = new Date().getFullYear(); 
  yearElement.innerText = currentYear;
});

