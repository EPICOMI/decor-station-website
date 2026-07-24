document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".scrolly-panel");
  if (!panels.length) return;

  // Use IntersectionObserver to seamlessly activate/deactivate panels
  const observerOptions = {
    root: null,
    rootMargin: "-45% 0px -45% 0px", // Strict center focus to prevent two panels showing active simultaneously
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      } else {
        entry.target.classList.remove("is-active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  panels.forEach(panel => observer.observe(panel));
});
