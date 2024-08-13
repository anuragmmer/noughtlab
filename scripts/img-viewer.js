document.addEventListener('DOMContentLoaded', () => {
    const imageGrids = document.querySelectorAll('.image-grid');
    
    imageGrids.forEach((imageGrid, gridIndex) => {
        let images = [];
        let currentImageIndex = 0;

        const viewer = document.createElement('div');
        viewer.className = 'fullscreen-viewer';
        viewer.innerHTML = `
            <div class="fullscreen-image-container">
                <img class="fullscreen-image" src="" alt="Fullscreen image">
            </div>
            <div class="nav-arrow left">&lt;</div>
            <div class="nav-arrow right">&gt;</div>
            <div class="image-indicator"></div>
            <div class="close-button">&times;</div>
        `;
        document.body.appendChild(viewer);

        const fullscreenImageContainer = viewer.querySelector('.fullscreen-image-container');
        const fullscreenImage = viewer.querySelector('.fullscreen-image');
        const leftArrow = viewer.querySelector('.nav-arrow.left');
        const rightArrow = viewer.querySelector('.nav-arrow.right');
        const imageIndicator = viewer.querySelector('.image-indicator');
        const closeButton = viewer.querySelector('.close-button');

        function createImageGrid() {
            const imageElements = imageGrid.querySelectorAll('img');
            images = Array.from(imageElements);

            imageGrid.querySelectorAll('.image-container').forEach(item => item.remove());

            if (images.length === 1) {
                imageGrid.className = 'image-grid single-image';
            } else if (images.length === 2) {
                imageGrid.className = 'image-grid two-images';
            } else if (images.length === 3) {
                imageGrid.className = 'image-grid three-images';
            } else if (images.length >= 4) {
                imageGrid.className = 'image-grid four-or-more-images';
            }

            images.forEach((img, index) => {
                if (index < 4 || images.length === 1) {
                    const imageContainer = document.createElement('div');
                    imageContainer.className = 'image-container';
                    imageGrid.appendChild(imageContainer);
                    imageContainer.appendChild(img);

                    imageContainer.addEventListener('click', () => {
                        openFullscreen(index);
                    });

                    if (index === 3 && images.length > 4) {
                        const indicator = document.createElement('div');
                        indicator.className = 'more-images-indicator';
                        indicator.textContent = `+${images.length - 4}`;
                        imageContainer.appendChild(indicator);
                    }
                }
            });
        }

        function openFullscreen(index) {
            currentImageIndex = index;
            updateFullscreenImage();
            viewer.classList.add('active');
            setTimeout(() => {
                fullscreenImageContainer.style.transform = 'scale(1)';
                fullscreenImageContainer.style.opacity = '1';
            }, 50);
            document.body.style.overflow = 'hidden';
        }

        function updateFullscreenImage() {
            const img = images[currentImageIndex];
            fullscreenImage.src = img.src;
            
            fullscreenImage.style.width = '';
            fullscreenImage.style.height = '';
            
            fullscreenImage.onload = () => {
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const imageAspectRatio = img.naturalWidth / img.naturalHeight;
                const viewportAspectRatio = viewportWidth / viewportHeight;

                if (imageAspectRatio > viewportAspectRatio) {
                    fullscreenImage.style.width = '90vw';
                    fullscreenImage.style.height = 'auto';
                } else {
                    fullscreenImage.style.height = '90vh';
                    fullscreenImage.style.width = 'auto';
                }
            };

            imageIndicator.textContent = `${currentImageIndex + 1} / ${images.length}`;
            leftArrow.style.display = currentImageIndex > 0 ? 'block' : 'none';
            rightArrow.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';
            
            if (images.length === 1) {
                leftArrow.style.display = 'none';
                rightArrow.style.display = 'none';
                imageIndicator.style.display = 'none';
            } else {
                imageIndicator.style.display = 'block';
            }
        }

        function closeFullscreen() {
            fullscreenImageContainer.style.transform = 'scale(0.9)';
            fullscreenImageContainer.style.opacity = '0';
            setTimeout(() => {
                viewer.classList.remove('active');
            }, 300);
            document.body.style.overflow = 'auto';
        }

        leftArrow.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateFullscreenImage();
            }
        });

        rightArrow.addEventListener('click', () => {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateFullscreenImage();
            }
        });

        closeButton.addEventListener('click', closeFullscreen);

        let touchStartX = 0;
        let touchEndX = 0;

        fullscreenImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        fullscreenImageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // swipe left hehe
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateFullscreenImage();
                }
            } else if (touchEndX > touchStartX) {
                // swipe right hehe
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateFullscreenImage();
                }
            }
        }

        if (imageGrid) {
            createImageGrid();
        }

        Promise.all(Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => img.addEventListener('load', resolve));
        })).then(createImageGrid);

        window.addEventListener('resize', () => {
            if (viewer.classList.contains('active')) {
                updateFullscreenImage();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        const activeViewer = document.querySelector('.fullscreen-viewer.active');
        if (!activeViewer) return;
        const leftArrow = activeViewer.querySelector('.nav-arrow.left');
        const rightArrow = activeViewer.querySelector('.nav-arrow.right');
        const closeButton = activeViewer.querySelector('.close-button');
        if (e.key === 'ArrowLeft') leftArrow.click();
        if (e.key === 'ArrowRight') rightArrow.click();
        if (e.key === 'Escape') closeButton.click();
    });
});
