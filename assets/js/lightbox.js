/**
 * Image Grid Lightbox
 * Minimal implementation for click-to-expand grid images
 */
(function() {
  'use strict';

  // Create lightbox container
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close"></span><img src="" alt="" />';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Open lightbox
  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close lightbox
  function close(e) {
    if (e) e.stopPropagation();
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Delegate click handler for all grid images
  document.addEventListener('click', function(e) {
    const img = e.target.closest('.image.grid img');
    if (img) {
      e.stopPropagation();
      open(img.src, img.alt);
    }
  });

  // Close on backdrop or close button
  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) close();
  });
})();
