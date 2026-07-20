document.querySelectorAll(".product-card").forEach(card => {
  const images = card.querySelectorAll(".image-cycler img");
  if (images.length === 0) return;
  images[0].classList.add("active");
  if (images.length < 2) return;
  let index = 0;
  let interval = null;
  card.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 1500);
  });
  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
    images[index].classList.remove("active");
    index = 0;
    images[index].classList.add("active");
  });
});