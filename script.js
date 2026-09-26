document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE NAVIGATION
     ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");

      menuBtn.setAttribute("aria-expanded", isOpen);

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      menuBtn.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu after clicking a navigation link */

    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach((link) => {

      link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.setAttribute(
          "aria-label",
          "Open menu"
        );

        menuBtn.textContent = "☰";

      });

    });

  }


  /* =========================================
     CURRENT YEAR
     ========================================= */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =========================================
     SCROLL REVEAL ANIMATION
     ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =========================================
     SMOOTH INTERNAL LINKS
     ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =========================================
     ESCAPE KEY — CLOSE MOBILE MENU
     ========================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      if (nav && nav.classList.contains("active")) {

        nav.classList.remove("active");

        if (menuBtn) {

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

          menuBtn.setAttribute(
            "aria-label",
            "Open menu"
          );

          menuBtn.textContent = "☰";

        }

      }

    }

  });


  /* =========================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ========================================= */

  document.addEventListener("click", (event) => {

    if (!nav || !menuBtn) {
      return;
    }

    if (!nav.classList.contains("active")) {
      return;
    }

    if (
      !nav.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      nav.classList.remove("active");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.setAttribute(
        "aria-label",
        "Open menu"
      );

      menuBtn.textContent = "☰";

    }

  });

});
