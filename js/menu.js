document.addEventListener('DOMContentLoaded', () => {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const siteNav = document.getElementById('siteNav');
  const menuOverlay = document.getElementById('menuOverlay');
  const body = document.body;

  function toggleMenu() {
    const isOpen = body.classList.contains('menu-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    body.classList.add('menu-open');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    menuToggleBtn.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
    menuToggleBtn.setAttribute('aria-label', 'Open menu');
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => {
      closeMenu();
    });
  }

  // Handle closing menu when a nav link is clicked
  if (siteNav) {
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // Handle Escape key to close the menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });
});
