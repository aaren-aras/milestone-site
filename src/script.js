document.addEventListener('DOMContentLoaded', function () {
    var screenWidth = window.innerWidth;
    /* Scrolling Header Background */
    var headerElement = document.querySelector('header');
    if (screenWidth >= 768)
        toggleHeaderBkgd(); // Initial state
    window.addEventListener('resize', toggleHeaderBkgd);
    function toggleHeaderBkgd() {
        window.addEventListener('scroll', function () {
            if (screenWidth >= 768) {
                if (window.scrollY >= 30)
                    headerElement.classList.add('js-header-bkgd');
                else
                    headerElement.classList.remove('js-header-bkgd');
            }
        });
    }
    /* Responsive Nav */
    var burgerBtnElement = document.querySelector('.burger-btn');
    var navElement = document.querySelector('nav');
    var anchorTags = navElement.querySelectorAll('a');
    var showMenu = false;
    if (screenWidth <= 767)
        hideNav(); // Initial state 
    burgerBtnElement.addEventListener('click', function (e) {
        // Stops `resize` event listener when burger button is clicked 
        e.stopPropagation();
        toggleMenu();
    });
    document.body.addEventListener('click', function () {
        if (showMenu)
            toggleMenu();
    });
    window.addEventListener('resize', function () {
        if (screenWidth >= 768) {
            navElement.classList.remove('js-open-nav');
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
        anchorTags.forEach(function (anchor) {
            anchor.style.display = 'none';
        });
    }
    function showNav() {
        anchorTags.forEach(function (anchor) {
            anchor.style.display = 'flex';
        });
    }
    /* Nav Jump Links */
    document.querySelector('.js-about').addEventListener('click', function (e) {
        // Removes HTML anchor tag effect 
        e.preventDefault();
        window.scrollTo({ top: 0 });
    });
    document.querySelector('.js-projects').addEventListener('click', function (e) {
        e.preventDefault();
        if (screenWidth <= 425)
            window.scrollTo(0, 1550);
        else if (426 <= screenWidth && screenWidth <= 767)
            window.scrollTo(0, 1650);
        else if (768 <= screenWidth && screenWidth <= 1023)
            window.scrollTo(0, 1750);
        else if (1024 <= screenWidth && screenWidth <= 1439)
            window.scrollTo(0, 1850);
        else if (screenWidth >= 1440)
            window.scrollTo(0, 1950);
    });
    document.querySelector('.js-contact').addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight });
    });
    /* Accordion and Dropdown Behaviour */
    var accordionSections = document.querySelectorAll('.js-accordion');
    var dropdownSections = document.querySelectorAll('.js-dropdown');
    accordionSections.forEach(function (section) {
        section.addEventListener('click', function () {
            toggleSection(section, accordionSections, 'js-open-accordion');
        });
    });
    dropdownSections.forEach(function (section) {
        section.addEventListener('click', function () {
            toggleSection(section, dropdownSections, 'js-open-dropdown');
        });
    });
    function toggleSection(section, sections, classToToggle) {
        // Closes other sections (if open)
        sections.forEach(function (otherSection) {
            if (otherSection !== section) {
                otherSection.classList.remove(classToToggle);
                var icon_1 = otherSection.querySelector('i.fa-solid');
                if (icon_1) {
                    icon_1.classList.remove('fa-chevron-down');
                    icon_1.classList.add('fa-chevron-right');
                }
            }
        });
        // Toggles current section
        section.classList.toggle(classToToggle);
        var icon = section.querySelector('i.fa-solid');
        if (icon) {
            icon.classList.toggle('fa-chevron-right');
            icon.classList.toggle('fa-chevron-down');
        }
    }
    /* Footer Date Auto-Update */
    var yearElement = document.querySelector('.js-current-year');
    var currentYear = new Date().getFullYear();
    yearElement.innerText = currentYear.toString();
});
