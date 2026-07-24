document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".scrolly-panel");
  if (!panels.length) return;

  // Configuration for intersection observer
  // Setting a rootMargin to trigger when a panel occupies the vertical center region of the viewport.
  // Using threshold to determine which element has the maximum presence.
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -25% 0px",
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  };

  const observerCallback = (entries) => {
    // Find the entry that has the largest intersection ratio (or simply find the active one)
    // To implement the exact requirement: "only a sentence shows at a time...
    // Previous panels may disappear and reappear only when they are in focus if the user scrolls back up."
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
        entry.target.classList.add("is-active");
      } else {
        entry.target.classList.remove("is-active");
      }
    });

    // Ensure at least one panel is active on screen if possible
    let anyActive = false;
    panels.forEach(p => {
      if (p.classList.contains("is-active")) anyActive = true;
    });

    if (!anyActive) {
      // Find the one closest to center
      let closestPanel = null;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      panels.forEach(p => {
        const rect = p.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distance = Math.abs(panelCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestPanel = p;
        }
      });

      if (closestPanel) {
        closestPanel.classList.add("is-active");
      }
    }
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  panels.forEach(panel => observer.observe(panel));
});
