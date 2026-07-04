(function () {
  const CareerShots = window.CareerShots || (window.CareerShots = {});
  const storageKey = "career-shots-theme";
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function safeGetTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function safeSetTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  function resolvedTheme() {
    const storedTheme = safeGetTheme();
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return mediaQuery.matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
  }

  function updateToggles() {
    const isDark = root.dataset.theme === "dark";

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function toggleTheme() {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    safeSetTheme(nextTheme);
    applyTheme(nextTheme);
    updateToggles();
  }

  CareerShots.initThemeToggle = function initThemeToggle() {
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      if (button.dataset.bound === "true") {
        return;
      }

      button.dataset.bound = "true";
      button.addEventListener("click", toggleTheme);
    });

    updateToggles();
  };

  applyTheme(resolvedTheme());

  mediaQuery.addEventListener("change", (event) => {
    if (safeGetTheme()) {
      return;
    }

    applyTheme(event.matches ? "dark" : "light");
    updateToggles();
  });
})();
