// script.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const body = document.body;
    const header = document.querySelector('header');
    const headerTitle = document.getElementById('header-title');
    const logo = document.getElementById('logo');
    const themeToggle = document.getElementById('theme-toggle');
    const mainTitle = document.querySelector('h1'); 
    const originalTitle = headerTitle.textContent;

    // Initialize dark mode
    body.classList.add('dark-mode');

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });


    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (!isInViewport(mainTitle)) {
            header.classList.add('visible');
            headerTitle.style.display = 'none';
            logo.style.display = 'none';
        } else {
            header.classList.remove('visible');
            headerTitle.style.display = 'none';
            logo.style.display = 'none';
        }
    });


    function handleBack(event) {
        event.preventDefault();
        const referrer = document.referrer;
        const currentDomain = window.location.origin;

        if (referrer && referrer.startsWith(currentDomain)) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }


    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', handleBack);
    });
});
