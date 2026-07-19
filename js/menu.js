(function () {
  const body = document.body;
  const menuBtn = document.getElementById('menuToggleBtn');
  const overlay = document.getElementById('menuOverlay');
  const navLinks = document.querySelectorAll('#siteNav a');

  function openMenu() {
    body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
  }

  function toggleMenu() {
    body.classList.contains('menu-open') ? closeMenu() : openMenu();
  }

  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
})();