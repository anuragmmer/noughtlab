// script.js

document.body.classList.add('dark-mode');
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const headerTitle = document.getElementById('header-title');
    const logo = document.getElementById('logo');
    const themeToggle = document.getElementById('theme-toggle');
    const originalTitle = headerTitle.textContent;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('visible');
            headerTitle.style.display = 'block';
            logo.style.display = 'none';
        } else {
            header.classList.remove('visible');
            headerTitle.textContent = originalTitle;
            logo.style.display = 'none';
        }
    });
});
