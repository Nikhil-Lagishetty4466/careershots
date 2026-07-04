(function () {
  const CareerShots = window.CareerShots || (window.CareerShots = {});

  function currentPageName() {
    const path = window.location.pathname.split("/").pop();
    return path && path.length ? path : "index.html";
  }

  CareerShots.initNavbar = function initNavbar() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-menu");
    const links = document.querySelectorAll(".nav-link");

    if (!header) {
      return;
    }

    const updateHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    const activePage = currentPageName();
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const normalizedHref = href.replace("./", "");
      const isHome = activePage === "index.html" && normalizedHref === "index.html";
      const isMatch = normalizedHref === activePage || isHome;

      link.classList.toggle("active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (!toggle || !menu || toggle.dataset.bound === "true") {
      return;
    }

    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
    };

    toggle.dataset.bound = "true";
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 960) {
          closeMenu();
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        closeMenu();
      }
    });
  };
})();
