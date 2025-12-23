/**
 * Image Grid Lightbox
 * Handles click-to-expand functionality for grid images
 * Auto-closes on scroll or outside click
 * Preserves article state and scroll position
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

  // State tracking
  let savedScrollPosition = 0;
  let lastScrollPosition = 0;
  let scrollThreshold = 50; // Only close if scrolled more than 50px

  // Close lightbox function
  function closeLightbox() {
    lightbox.classList.remove('active');

    // Re-enable scrolling
    document.body.style.overflow = '';

    // Restore the saved scroll position
    if (savedScrollPosition > 0) {
      window.scrollTo(0, savedScrollPosition);
    }
  }

  // Open lightbox function
  function openLightbox(src, alt) {
    // Save current scroll position before opening
    savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollPosition = savedScrollPosition;

    lightboxImg.src = src;
    lightboxImg.alt = alt;

    // Disable background scrolling
    document.body.style.overflow = 'hidden';

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
        e.stopPropagation(); // Prevent article close handler from firing
        openLightbox(this.src, this.alt);
      });
    });
  }

  // Close on close button click
  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    closeLightbox();
  });

  // Close on backdrop click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on significant scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    if (lightbox.classList.contains('active')) {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);

      // Only close if scrolled more than threshold
      if (scrollDelta > scrollThreshold) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(closeLightbox, 100);
      }
    }
  }, { passive: true });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      e.stopPropagation();
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
