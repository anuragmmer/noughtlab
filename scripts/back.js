document.addEventListener('DOMContentLoaded', () => {
  const imageGrid = document.querySelector('.image-grid');
  let images = [];
  let currentImageIndex = 0;

  // Create fullscreen viewer elements
  const viewer = document.createElement('div');
  viewer.className = 'fullscreen-viewer';
  viewer.innerHTML = `
      <img class="fullscreen-image" src="" alt="Fullscreen image">
      <div class="nav-arrow left">&lt;</div>
      <div class="nav-arrow right">&gt;</div>
      <div class="image-indicator"></div>
      <div class="close-button">&times;</div>
  `;
  document.body.appendChild(viewer);

  const fullscreenImage = viewer.querySelector('.fullscreen-image');
  const leftArrow = viewer.querySelector('.nav-arrow.left');
  const rightArrow = viewer.querySelector('.nav-arrow.right');
  const imageIndicator = viewer.querySelector('.image-indicator');
  const closeButton = viewer.querySelector('.close-button');

  function createImageGrid() {
      const imageElements = imageGrid.querySelectorAll('img');
      images = Array.from(imageElements);

      // Remove existing image containers
      imageGrid.querySelectorAll('.image-container').forEach(item => item.remove());

      // Set appropriate class based on number of images
      if (images.length === 2) {
          imageGrid.className = 'image-grid two-images';
      } else if (images.length === 3) {
          imageGrid.className = 'image-grid three-images';
      } else if (images.length >= 4) {
          imageGrid.className = 'image-grid four-or-more-images';
      }

      images.forEach((img, index) => {
          if (index < 4) {
              const imageContainer = document.createElement('div');
              imageContainer.className = 'image-container';
              imageGrid.appendChild(imageContainer);
              imageContainer.appendChild(img);

              img.addEventListener('click', () => {
                  openFullscreen(index);
              });

              if (index === 3 && images.length > 4) {
                  const indicator = document.createElement('div');
                  indicator.className = 'image-indicator';
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
  }

  function updateFullscreenImage() {
      fullscreenImage.src = images[currentImageIndex].src;
      imageIndicator.textContent = `${currentImageIndex + 1} / ${images.length}`;
      leftArrow.style.display = currentImageIndex > 0 ? 'block' : 'none';
      rightArrow.style.display = currentImageIndex < images.length - 1 ? 'block' : 'none';
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

  closeButton.addEventListener('click', () => {
      viewer.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
      if (!viewer.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') leftArrow.click();
      if (e.key === 'ArrowRight') rightArrow.click();
      if (e.key === 'Escape') closeButton.click();
  });

  // Initialize image grid
  if (imageGrid) {
      createImageGrid();
  }

  // Recalculate layout when all images are loaded
  Promise.all(Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => img.addEventListener('load', resolve));
  })).then(createImageGrid);
});