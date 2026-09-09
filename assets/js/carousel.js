document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const controls = carousel.querySelector("[data-carousel-controls]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const current = carousel.querySelector("[data-carousel-current]");

  if (!viewport || slides.length < 2 || !controls || !previous || !next || !current) return;

  let activeIndex = 0;
  let scrollFrame;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const slidePosition = (slide) => slide.offsetLeft - viewport.offsetLeft;

  const updateControls = (index) => {
    activeIndex = index;
    current.textContent = String(index + 1);
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  };

  const goTo = (index) => {
    const boundedIndex = Math.max(0, Math.min(index, slides.length - 1));
    viewport.scrollTo({
      left: slidePosition(slides[boundedIndex]),
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
    updateControls(boundedIndex);
  };

  previous.addEventListener("click", () => goTo(activeIndex - 1));
  next.addEventListener("click", () => goTo(activeIndex + 1));

  viewport.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
  });

  viewport.addEventListener("scroll", () => {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = window.requestAnimationFrame(() => {
      const closestIndex = slides.reduce((closest, slide, index) => {
        const distance = Math.abs(viewport.scrollLeft - slidePosition(slide));
        const closestDistance = Math.abs(viewport.scrollLeft - slidePosition(slides[closest]));
        return distance < closestDistance ? index : closest;
      }, 0);
      updateControls(closestIndex);
    });
  }, { passive: true });

  controls.hidden = false;
  updateControls(0);
});
