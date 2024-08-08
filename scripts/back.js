document.addEventListener("DOMContentLoaded", function() {
    // Get all elements with class 'back-link'
    const backLinks = document.querySelectorAll('.back-link');
  
    // Add event listener to each back link
    backLinks.forEach(function(backLink) {
      backLink.addEventListener('click', function(event) {
        event.preventDefault(); 
        
        
        if (window.history.length > 1) {
          window.history.back(); 
        } else {
          
          window.location.href = '/'; 
        }
      });
    });
  });