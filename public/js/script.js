// Form Validation
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Locomotive Scroll with Navbar Show/Hide
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector("[data-scroll-container]");
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    lerp: 0.05,
  });

  scroll.on("scroll", (obj) => {
    const currentScroll = obj.scroll.y;

    if (currentScroll > lastScrollTop) {
      navbar.classList.add("hide-navbar");
    } else {
      navbar.classList.remove("hide-navbar");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const lazyCards = document.querySelectorAll(".lazy-card");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector(".lazy-img");
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "100px",
    threshold: 0.1
  });

  lazyCards.forEach(card => observer.observe(card));
});
