(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var menuToggleBtn = document.getElementById('menuToggleBtn');
    var menuOverlay = document.getElementById('menuOverlay');
    var body = document.body;

    if (!menuToggleBtn || !menuOverlay) {
      return;
    }

    function toggleMenu() {
      var isOpen = body.classList.toggle('menu-open');
      menuToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    function closeMenu() {
      if (body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
        menuToggleBtn.setAttribute('aria-label', 'Open menu');
      }
    }

    menuToggleBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on any navigation link inside the site-nav drawer
    var navLinks = document.querySelectorAll('#siteNav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu on pressing Escape key for accessibility
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  });
})();
