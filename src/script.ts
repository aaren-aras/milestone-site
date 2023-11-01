document.addEventListener('DOMContentLoaded', () => {
  const screenWidth: number = window.innerWidth;

  /* Scrolling Header Background */
  const headerElement: HTMLElement | null = document.querySelector('header');

  if (screenWidth >= 768) toggleHeaderBkgd(); // Initial state
  window.addEventListener('resize', toggleHeaderBkgd);

  function toggleHeaderBkgd(): void {
    window.addEventListener('scroll', () => {
      if (screenWidth >= 768) {
        if (window.scrollY >= 30) headerElement?.classList.add('js-header-bkgd');
        else headerElement?.classList.remove('js-header-bkgd');
      }
    });
  }

  /* Responsive Nav */
  const burgerBtnElement = document.querySelector('.burger-btn') as HTMLElement;
  const navElement: HTMLElement | null = document.querySelector('nav');
  const anchorTags = navElement?.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
  let showMenu: boolean = false;

  if (screenWidth <= 767) hideNav(); // Initial state 

  burgerBtnElement.addEventListener('click', (e) => {
    // Stops `resize` event listener when burger button is clicked 
    e.stopPropagation();
    toggleMenu();
  });

  document.body.addEventListener('click', () => {
    if (showMenu) toggleMenu();
  });

  window.addEventListener('resize', () => {
    if (screenWidth >= 768) {
      navElement?.classList.remove('js-open-nav');
      showMenu = false;
    }
  });

  function toggleMenu(): void {
    if (!showMenu) {
      navElement?.classList.add('js-open-nav');
      showNav();
      showMenu = true;
    }
    else {
      navElement?.classList.remove('js-open-nav');
      hideNav();
      showMenu = false;
    }
  }

  function hideNav(): void {
    anchorTags.forEach((anchor) => {
      anchor.style.display = 'none';
    });
  }

  function showNav(): void {
    anchorTags.forEach((anchor) => {
      anchor.style.display = 'flex';
    });
  }

  /* Nav Jump Links */
  document.querySelector('.js-about')?.addEventListener('click', (e) => {
    // Removes HTML anchor tag effect 
    e.preventDefault();
    window.scrollTo({ top: 0 });
  });

  document.querySelector('.js-projects')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (screenWidth <= 425) window.scrollTo(0, 1550);
    else if (426 <= screenWidth && screenWidth <= 767) window.scrollTo(0, 1650);
    else if (768 <= screenWidth && screenWidth <= 1023) window.scrollTo(0, 1750);
    else if (1024 <= screenWidth && screenWidth <= 1439) window.scrollTo(0, 1850);
    else if (screenWidth >= 1440) window.scrollTo(0, 1950);
  });

  document.querySelector('.js-contact')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight });
  });

  /* Accordion and Dropdown Behaviour */
  const accordionSections: NodeListOf<HTMLElement> = document.querySelectorAll('.js-accordion');
  const dropdownSections: NodeListOf<HTMLElement> = document.querySelectorAll('.js-dropdown');

  accordionSections.forEach((section) => {
    section.addEventListener('click', () => {
      toggleSection(section, accordionSections, 'js-open-accordion');
    });
  });

  dropdownSections.forEach((section) => {
    section.addEventListener('click', () => {
      toggleSection(section, dropdownSections, 'js-open-dropdown');
    });
  });

  function toggleSection(section: HTMLElement, sections: NodeListOf<HTMLElement>, classToToggle: string): void {
    // Closes other sections (if open)
    sections.forEach((otherSection) => {
      if (otherSection !== section) {
        otherSection.classList.remove(classToToggle);
        const icon: Element | null = otherSection.querySelector('i.fa-solid');
        if (icon) {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-right');
        }
      }
    });

    // Toggles current section
    section.classList.toggle(classToToggle);
    const icon: Element | null = section.querySelector('i.fa-solid');
    if (icon) {
      icon.classList.toggle('fa-chevron-right');
      icon.classList.toggle('fa-chevron-down');
    }
  }

  /* Carousel Caption Positioning */
  const carouselElements = [
    '#carouselExampleCaptions1',
    '#carouselExampleCaptions2',
    '#carouselExampleCaptions3',
    '#carouselExampleCaptions4',
    '#carouselExampleCaptions5'
  ];

  carouselElements.forEach((carouselElement) => {
    const carousel = document.querySelector(carouselElement);
    const carouselInnerElement = carousel?.querySelector('.js-carousel-inner') as HTMLElement;
    const h5Elements = carousel?.querySelectorAll('.js-h5') as NodeListOf<HTMLElement>;
    const pElements = carousel?.querySelectorAll('.js-p') as NodeListOf<HTMLElement>;
    let activeSlide = 0;

    carouselInnerElement.style.overflow = 'visible'; // Initial state
    // h5Elements[0].style.visibility = 'visible';
    // pElements[0].style.visibility = 'visible';

    carousel?.addEventListener('slide.bs.carousel', () => {
      if (event.direction === 'right') activeSlide = event.from;
      else if (event.direction === 'left') activeSlide = event.to;
      if (activeSlide === 0) activeSlide = 4; // Edge case 

      const activeH5 = h5Elements[activeSlide];
      const activeP = pElements[activeSlide];

      carouselInnerElement.style.overflow = 'hidden';
      activeH5.style.visibility = 'hidden';
      activeP.style.visibility = 'hidden';

      carousel?.addEventListener('slid.bs.carousel', () => {
        carouselInnerElement.style.overflow = 'visible';
        h5Elements.forEach((h5) => {
          h5.style.visibility = 'visible';
          h5.style.opacity = '1';
        });
        pElements.forEach((p) => {
          p.style.visibility = 'visible';
          p.style.opacity = '1';
        });
        // activeH5.style.visibility = 'visible';
        // activeP.style.visibility = 'visible';
      });
    });
  });

  /* Footer Date Auto-Update */
  const yearElement = document.querySelector('.js-current-year') as HTMLElement;
  const currentYear: number = new Date().getFullYear();
  yearElement.innerText = currentYear.toString();
});