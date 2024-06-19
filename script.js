document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        loader.style.display = "none";

        const content = document.getElementById("content");
        content.classList.remove("hidden");
    }, 6000);

    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
            cursor.style.backgroundColor = window.getComputedStyle(element).color;
        }
    });

    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    function getRandomPosition() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        return { x, y };
    }

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        const { x, y } = getRandomPosition();
        star.style.top = `${y}px`;
        star.style.left = `${x}px`;

        starsContainer.appendChild(star);
    }

    const starsContainer = document.getElementById("stars");
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        createStar();
    }

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
                currentSection.style.transition = 'opacity 1s ease-in-out';
                currentSection.style.opacity = 0;

                setTimeout(() => {
                    currentSection.style.display = 'none';
                    targetSection.style.display = 'flex';
                    targetSection.style.opacity = 0;
                    targetSection.style.transition = 'opacity 1s ease-in-out';

                    setTimeout(() => {
                        targetSection.style.opacity = 1;
                    }, 50);

                    if (targetId === 'about') {
                        fadeInWords(wordSpans);
                    }
                }, 1000);
            }
        } else {
            console.log(`Showing section ${targetId}`);
            targetSection.style.display = 'flex';
            targetSection.style.opacity = 0;
            targetSection.style.transition = 'opacity 1s ease-in-out';

            setTimeout(() => {
                targetSection.style.opacity = 1;
            }, 50);

            if (targetId === 'about') {
                fadeInWords(wordSpans);
            }
        }
    }

    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const introText = document.getElementById('intro-text');
            introText.style.transition = 'opacity 1s ease-in-out';
            introText.style.opacity = 0;

            setTimeout(() => {
                const stars = document.querySelectorAll('.star');
                stars.forEach(star => {
                    const angle = Math.random() * 360;
                    const radius = 50;
                    const x = radius * Math.cos(angle * (Math.PI / 180));
                    const y = radius * Math.sin(angle * (Math.PI / 180));
                    star.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
                    star.style.transform = `translate(${x}px, ${y}px) scale(10, 2)`;
                    star.style.opacity = 0;
                });

                setTimeout(() => {
                    const targetId = link.getAttribute('href').substring(1);
                    switchSection(targetId);
                }, 50);
            }, 50);
        });
    });

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

    document.getElementById('anurag').addEventListener('mouseenter', function() {
        const emailSpan = document.createElement('span');
        emailSpan.classList.add('email');
        emailSpan.textContent = 'anurag@gmx.com';
        this.appendChild(emailSpan);
    });

    document.getElementById('anurag').addEventListener('mouseleave', function() {
        const emailSpan = this.querySelector('.email');
        if (emailSpan) {
            emailSpan.remove();
        }
    });

    document.getElementById('kumar').addEventListener('mouseenter', function() {
        const emailSpan = document.createElement('span');
        emailSpan.classList.add('email');
        emailSpan.textContent = 'arsh.kumar.adarsh@gmail.com';
        this.appendChild(emailSpan);
    });

    document.getElementById('kumar').addEventListener('mouseleave', function() {
        const emailSpan = this.querySelector('.email');
        if (emailSpan) {
            emailSpan.remove();
        }
    });
});
