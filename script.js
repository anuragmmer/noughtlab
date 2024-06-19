document.addEventListener("DOMContentLoaded", function() {
    // Wait for the logo animation to finish before showing the content
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.display = "none";

        const content = document.getElementById("content");
        content.classList.remove("hidden");
    }, 6000); // Adjust timing as needed

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // Invert effect
    document.addEventListener('mousemove', (e) => {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
            cursor.style.backgroundColor = window.getComputedStyle(element).color;
        }
    });

    // Function to generate random coordinates
    function getRandomPosition() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return { x, y };
    }

    // Function to create stars
    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        const { x, y } = getRandomPosition();
        star.style.top = `${y}px`;
        star.style.left = `${x}px`;

        starsContainer.appendChild(star);
    }

    // Initialize stars container
    const starsContainer = document.getElementById("stars");
    const numStars = 18; // Adjust the number of stars

    // Create stars
    for (let i = 0; i < numStars; i++) {
        createStar();
    }

    // Light painting effect and dissolve on menu item click
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior

            // Fade out intro text
            const introText = document.getElementById('intro-text');
            introText.style.transition = 'opacity 2s ease-in-out';
            introText.style.opacity = 0;

            // Wait for intro text to fade out before starting the star animation and showing section
            setTimeout(() => {
                const stars = document.querySelectorAll('.star');
                stars.forEach(star => {
                    const angle = Math.random() * 360; // Random angle for circular arc
                    const radius = 50; // Adjust the radius as needed
                    const x = radius * Math.cos(angle * (Math.PI / 180));
                    const y = radius * Math.sin(angle * (Math.PI / 180));
                    star.style.transition = 'transform 2s ease-in-out, opacity 2s ease-in-out';
                    star.style.transform = `translate(${x}px, ${y}px) scale(10, 2)`; // Move and stretch the star
                    star.style.opacity = 0; // Fade out
                });

                // Wait for the star animation to complete before showing the section
                setTimeout(() => {
                    const targetId = link.getAttribute('href').substring(1);
                    switchSection(targetId);
                }, 700); // Adjust this timeout to match the star animation duration
            }, 500); // Adjust this timeout to match the intro text fade-out duration
        });
    });

    // Word by word fade in and stay for about section
    const aboutText = "NoughtLab is our collective endeavour to experiment with possibilities in various fields. We are a creative collective based in India. Our focus is to approach the field of art & commerce through commercialized experimentation for the better of everyone.";
    const aboutElement = document.getElementById('about-text');

    function createWordSpans(text) {
        return text.split(' ').map(word => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = 0;
            return span;
        });
    }

    function fadeInWords(words, delay = 50) {
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = 'opacity 1s';
                word.style.opacity = 1;
            }, index * delay);
        });
    }

    const wordSpans = createWordSpans(aboutText);
    wordSpans.forEach(span => aboutElement.appendChild(span));

    // Contact section hover effect
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            let emailSpan = this.querySelector('.email');
            if (!emailSpan) {
                emailSpan = document.createElement('span');
                emailSpan.classList.add('email');
                emailSpan.textContent = this.dataset.email;
                this.appendChild(emailSpan);
            }
        });

        item.addEventListener('mouseleave', function() {
            const emailSpan = this.querySelector('.email');
            if (emailSpan) {
                emailSpan.remove();
            }
        });
    });
});

function switchSection(targetId) {
    const currentSection = document.querySelector('.section:not([style*="display: none"])');
    const targetSection = document.getElementById(targetId);

    if (!targetSection) {
        console.error(`Target section with id "${targetId}" not found`);
        return;
    }

    if (currentSection) {
        if (currentSection !== targetSection) {
            console.log('Switching section from', currentSection.id, 'to', targetSection.id);
            currentSection.style.transition = 'opacity 2s ease-in-out';
            currentSection.style.opacity = 0;

            setTimeout(() => {
                currentSection.style.display = 'none';
                targetSection.style.display = 'flex';
                targetSection.style.opacity = 0;
                targetSection.style.transition = 'opacity 2s ease-in-out';

                setTimeout(() => {
                    targetSection.style.opacity = 1;
                }, 50);

                if (targetId === 'about') {
                    fadeInWords(wordSpans);
                }
            }, 2000);
        }
    } else {
        console.log(`Showing section ${targetId}`);
        targetSection.style.display = 'flex';
        targetSection.style.opacity = 0;
        targetSection.style.transition = 'opacity 2s ease-in-out';

        setTimeout(() => {
            targetSection.style.opacity = 1;
        }, 50);

        if (targetId === 'about') {
            fadeInWords(wordSpans);
        }
    }
}
