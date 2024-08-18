document.addEventListener("DOMContentLoaded", function() {
    const h1Elements = document.querySelectorAll("h1");
    const targetElements = document.querySelectorAll("p, h1, blockquote");
    let isColorChanged = false;

    h1Elements.forEach(function(h1) {
        h1.addEventListener("click", function() {
            targetElements.forEach(function(element) {
                element.style.color = isColorChanged ? "" : "#C48C5B";
            });

            const imageContainers = document.querySelectorAll('.image-grid .image-container');
            imageContainers.forEach(function(container) {
                container.style.opacity = isColorChanged ? "" : "0.5";
            });

            isColorChanged = !isColorChanged;
        });
    });
});