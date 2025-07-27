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
