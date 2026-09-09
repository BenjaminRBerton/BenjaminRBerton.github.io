document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const controls = carousel.querySelector("[data-carousel-controls]");
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const current = carousel.querySelector("[data-carousel-current]");
  const toggle = carousel.querySelector("[data-carousel-toggle]");

  if (!viewport || slides.length < 2 || !controls || !previous || !next || !current) return;

  const autoplayDelay = Number.parseInt(carousel.dataset.carouselAutoplay || "0", 10);
  const loops = carousel.hasAttribute("data-carousel-loop");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeIndex = 0;
  let autoplayTimer;
  let scrollFrame;
  let rotationPaused = false;
  let interactionPaused = false;
  let carouselVisible = true;

  const slidePosition = (slide) => slide.offsetLeft - viewport.offsetLeft;

  const autoplayIsAvailable = () => autoplayDelay > 0 && !reducedMotion.matches;

  const autoplayCanRun = () => (
    autoplayIsAvailable()
    && !rotationPaused
    && !interactionPaused
    && !document.hidden
    && carouselVisible
  );

  const updateToggle = () => {
    if (!toggle) return;

    toggle.hidden = !autoplayIsAvailable();
    toggle.textContent = rotationPaused ? "Resume rotation" : "Pause rotation";
    toggle.setAttribute("aria-pressed", String(rotationPaused));
  };

  const updateSlideMedia = (slide, isActive) => {
    slide.querySelectorAll("[data-feature-video]").forEach((video) => {
      if (isActive && !reducedMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    if (!isActive) {
      const youtubeFrame = slide.querySelector("[data-youtube-lite] iframe");
      youtubeFrame?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
        "https://www.youtube-nocookie.com",
      );
    }
  };

  const updateControls = (index) => {
    activeIndex = index;
    current.textContent = String(index + 1);
    previous.disabled = !loops && index === 0;
    next.disabled = !loops && index === slides.length - 1;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === index;
      slide.toggleAttribute("inert", !isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      updateSlideMedia(slide, isActive);
    });
  };

  const scheduleAutoplay = () => {
    window.clearTimeout(autoplayTimer);
    if (!autoplayCanRun()) return;

    autoplayTimer = window.setTimeout(() => {
      goTo(activeIndex + 1);
      scheduleAutoplay();
    }, autoplayDelay);
  };

  const normalizeIndex = (index) => {
    if (!loops) return Math.max(0, Math.min(index, slides.length - 1));
    return (index + slides.length) % slides.length;
  };

  const goTo = (index) => {
    const wrapsAround = loops && (index < 0 || index >= slides.length);
    const targetIndex = normalizeIndex(index);
    viewport.scrollTo({
      left: slidePosition(slides[targetIndex]),
      behavior: reducedMotion.matches || wrapsAround ? "auto" : "smooth",
    });
    updateControls(targetIndex);
  };

  carousel.querySelectorAll("[data-feature-video-pair]").forEach((pair) => {
    const [primaryVideo, companionVideo] = pair.querySelectorAll("[data-feature-video]");
    if (!primaryVideo || !companionVideo) return;

    const syncCompanion = () => {
      if (!Number.isFinite(primaryVideo.currentTime)) return;
      if (Math.abs(companionVideo.currentTime - primaryVideo.currentTime) > 0.18) {
        companionVideo.currentTime = primaryVideo.currentTime;
      }
    };

    primaryVideo.addEventListener("play", () => {
      syncCompanion();
      companionVideo.play().catch(() => {});
    });
    primaryVideo.addEventListener("pause", () => companionVideo.pause());
    primaryVideo.addEventListener("seeking", syncCompanion);
    primaryVideo.addEventListener("timeupdate", syncCompanion);
  });

  carousel.querySelectorAll("[data-youtube-lite]").forEach((player) => {
    const playButton = player.querySelector("button");
    if (!playButton) return;

    playButton.addEventListener("click", () => {
      const frame = document.createElement("iframe");
      const videoId = player.dataset.youtubeId;

      frame.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0`;
      frame.title = player.dataset.youtubeTitle || "YouTube video";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;

      rotationPaused = true;
      updateToggle();
      scheduleAutoplay();
      player.replaceChildren(frame);
      frame.focus();
    }, { once: true });
  });

  previous.addEventListener("click", () => {
    goTo(activeIndex - 1);
    scheduleAutoplay();
  });

  next.addEventListener("click", () => {
    goTo(activeIndex + 1);
    scheduleAutoplay();
  });

  if (toggle) {
    toggle.addEventListener("click", () => {
      rotationPaused = !rotationPaused;
      updateToggle();
      scheduleAutoplay();
    });
  }

  viewport.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
    scheduleAutoplay();
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
      scheduleAutoplay();
    });
  }, { passive: true });

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    interactionPaused = true;
    scheduleAutoplay();
  });

  const resumeAfterTouch = (event) => {
    if (event.pointerType === "mouse") return;
    interactionPaused = false;
    scheduleAutoplay();
  };

  viewport.addEventListener("pointerup", resumeAfterTouch);
  viewport.addEventListener("pointercancel", resumeAfterTouch);

  carousel.addEventListener("mouseenter", () => {
    interactionPaused = true;
    scheduleAutoplay();
  });

  carousel.addEventListener("mouseleave", () => {
    interactionPaused = false;
    scheduleAutoplay();
  });

  carousel.addEventListener("focusin", () => {
    interactionPaused = true;
    scheduleAutoplay();
  });

  carousel.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      interactionPaused = carousel.contains(document.activeElement);
      scheduleAutoplay();
    });
  });

  window.addEventListener("blur", () => {
    const activeElement = document.activeElement;
    if (activeElement?.tagName === "IFRAME" && carousel.contains(activeElement)) {
      interactionPaused = true;
      scheduleAutoplay();
    }
  });

  document.addEventListener("visibilitychange", scheduleAutoplay);

  const handleMotionPreference = () => {
    updateToggle();
    updateControls(activeIndex);
    scheduleAutoplay();
  };

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", handleMotionPreference);
  } else {
    reducedMotion.addListener(handleMotionPreference);
  }

  if ("IntersectionObserver" in window && autoplayDelay > 0) {
    const observer = new IntersectionObserver((entries) => {
      carouselVisible = entries[0].isIntersecting;
      scheduleAutoplay();
    }, { threshold: 0.35 });
    observer.observe(carousel);
  }

  controls.hidden = false;
  updateControls(0);
  updateToggle();
  scheduleAutoplay();
});
