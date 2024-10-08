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
            <div class="nav-container">
                <div class="nav-arrow left">&lt;</div>
                <div class="image-indicator"></div>
                <div class="nav-arrow right">&gt;</div>
            </div>
            <div class="close-button">&times;</div>
        `;
        document.body.appendChild(viewer);

        const fullscreenImageContainer = viewer.querySelector('.fullscreen-image-container');
        const fullscreenImage = viewer.querySelector('.fullscreen-image');
        const navContainer = viewer.querySelector('.nav-container');
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
            history.pushState({ fullscreenOpen: true }, '');
            updateNavStyles();
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

        function updateNavStyles() {
            const elements = [leftArrow, rightArrow, imageIndicator];
            elements.forEach(el => {
                el.style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
            });
        
            if (window.innerWidth <= 768) {
                navContainer.style.position = 'fixed';
                navContainer.style.bottom = '20px';
                navContainer.style.left = '50%';
                navContainer.style.transform = 'translateX(-50%)';
                navContainer.style.display = 'flex';
                navContainer.style.justifyContent = 'space-between';
                navContainer.style.alignItems = 'center';
                navContainer.style.width = '80%';
                navContainer.style.maxWidth = '300px';
        
                // Reset individual element styles
                [leftArrow, rightArrow, imageIndicator].forEach(el => {
                    el.style.position = 'static';
                    el.style.top = 'auto';
                    el.style.left = 'auto';
                    el.style.right = 'auto';
                    el.style.bottom = 'auto';
                    el.style.transform = 'none';
                });
            } else {
                navContainer.style.position = '';
                navContainer.style.bottom = '';
                navContainer.style.left = '';
                navContainer.style.transform = '';
                navContainer.style.display = '';
                navContainer.style.justifyContent = '';
                navContainer.style.alignItems = '';
                navContainer.style.width = '';
                navContainer.style.maxWidth = '';
        
                leftArrow.style.position = 'absolute';
                leftArrow.style.top = '50%';
                leftArrow.style.left = '20px';
                leftArrow.style.transform = 'translateY(-50%)';
        
                rightArrow.style.position = 'absolute';
                rightArrow.style.top = '50%';
                rightArrow.style.right = '20px';
                rightArrow.style.transform = 'translateY(-50%)';
        
                imageIndicator.style.position = 'absolute';
                imageIndicator.style.bottom = '20px';
                imageIndicator.style.left = '50%';
                imageIndicator.style.transform = 'translateX(-50%)';
            }
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

        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) {
                closeFullscreen();
            }
        });

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
                updateNavStyles();
            }
        });

        window.addEventListener('popstate', () => {
            if (viewer.classList.contains('active')) {
                closeFullscreen();
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
