(function () {
  const CareerShots = window.CareerShots || (window.CareerShots = {});

  function animateCount(element) {
    const target = Number(element.dataset.countTo || 0);
    const suffix = element.dataset.countSuffix || "";
    const duration = 1200;
    const startTime = performance.now();

    const frame = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);

      element.textContent = current + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(frame);
      }
    };

    window.requestAnimationFrame(frame);
  }

  CareerShots.initAnimations = function initAnimations() {
    const animatedItems = document.querySelectorAll("[data-animate]");
    const statValues = document.querySelectorAll("[data-count-to]");

    if (!("IntersectionObserver" in window)) {
      animatedItems.forEach((item) => item.classList.add("is-visible"));
      statValues.forEach((item) => animateCount(item));
      return;
    }

    animatedItems.forEach((item, index) => {
      item.style.setProperty("--delay", `${Math.min(index * 70, 280)}ms`);
    });

    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    animatedItems.forEach((item) => fadeObserver.observe(item));

    const countObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
      }
    );

    statValues.forEach((value) => countObserver.observe(value));
  };
})();
