/**
 * Image Grid Lightbox
 * Handles click-to-expand functionality for grid images
 * Auto-closes on scroll or outside click
 */
(function() {
  'use strict';

  // Create lightbox container on page load
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close"></span><img src="" alt="" />';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Close lightbox function
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Open lightbox function
  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    document.body.style.overflow = 'hidden'; // Disable scrolling

    // Small delay to trigger CSS transition
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
  }

  // Initialize click handlers for all grid images
  function initializeGridImages() {
    const gridImages = document.querySelectorAll('.image.grid img');

    gridImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        openLightbox(this.src, this.alt);
      });
    });
  }

  // Close on close button click
  closeBtn.addEventListener('click', closeLightbox);

  // Close on backdrop click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (lightbox.classList.contains('active')) {
      // Debounce to avoid closing on minor scroll movements
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(closeLightbox, 100);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGridImages);
  } else {
    initializeGridImages();
  }

  // Re-initialize when new content is dynamically loaded (for SPA-like behavior)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        initializeGridImages();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
