document.body.classList.add('dark-mode');
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

window.addEventListener('scroll', function() {
    const introSection = document.querySelector('.intro-section');
    const introText = document.querySelector('.intro-text');
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    const scrollPosition = window.scrollY;
    const introHeight = introSection.offsetHeight;
    
    if (scrollPosition > introHeight * 0.7) {
        header.style.transform = 'translateY(0)';
        introText.style.opacity = '0';
    } else {
        header.style.transform = 'translateY(-100%)';
        introText.style.opacity = '1';
    }

    if (scrollPosition > 50) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

function openModal(modalId) {
    document.querySelector('.main-content').classList.add('blur');
    const modalSection = document.getElementById(modalId);
    modalSection.style.display = 'flex';
    setTimeout(() => {
        modalSection.style.opacity = '1';
        const modalContent = modalSection.querySelector('.modal-content');
        const paragraphs = modalContent.querySelectorAll('p, .contact-info');
        const backButton = modalContent.querySelector('.back-button');
        paragraphs.forEach((paragraph, index) => {
            setTimeout(() => {
                paragraph.style.opacity = '1';
                paragraph.style.transform = 'translateY(0)';
            }, 200 * (index + 1));
        });
        setTimeout(() => {
            backButton.style.opacity = '1';
            backButton.style.transform = 'translateY(0)';
        }, 200 * (paragraphs.length + 1));
    }, 50);
}

function closeModal(modalId) {
    const modalSection = document.getElementById(modalId);
    const modalContent = modalSection.querySelector('.modal-content');
    const paragraphs = modalContent.querySelectorAll('p, .contact-info');
    const backButton = modalContent.querySelector('.back-button');

    backButton.style.opacity = '0';
    backButton.style.transform = 'translateY(20px)';

    paragraphs.forEach((paragraph, index) => {
        setTimeout(() => {
            paragraph.style.opacity = '0';
            paragraph.style.transform = 'translateY(20px)';
        }, 100 * index);
    });

    setTimeout(() => {
        modalSection.style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.main-content').classList.remove('blur');
            modalSection.style.display = 'none';
        }, 500);
    }, 100 * paragraphs.length);
}

document.getElementById('about-link').addEventListener('click', function(e) {
    e.preventDefault();
    openModal('about-section');
});

document.getElementById('contact-link').addEventListener('click', function(e) {
    e.preventDefault();
    openModal('contact-section');
});

document.querySelectorAll('.back-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(this.getAttribute('data-modal'));
    });
});


const video = document.getElementById('intro-video');
video.addEventListener('loadeddata', function() {

    video.play().catch(error => {
        console.error("Auto-play was prevented:", error);

    });
    setTimeout(() => {
        video.style.opacity = '1';
    }, 100);
});

video.addEventListener('ended', function() {
    video.currentTime = 0;
    video.play().catch(error => {
        console.error("Restarting video failed:", error);
    });
});