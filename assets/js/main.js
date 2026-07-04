(function () {
  const CareerShots = window.CareerShots || (window.CareerShots = {});

  function updateYear() {
    document.querySelectorAll("[data-current-year]").forEach((element) => {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function initAccordion() {
    document.querySelectorAll(".faq-item").forEach((item, index) => {
      const button = item.querySelector(".faq-toggle");
      const panel = item.querySelector(".faq-panel");

      if (!button || !panel || button.dataset.bound === "true") {
        return;
      }

      const panelId = panel.id || `faq-panel-${index + 1}`;
      panel.id = panelId;
      panel.hidden = true;
      button.setAttribute("aria-controls", panelId);
      button.setAttribute("aria-expanded", "false");
      button.dataset.bound = "true";

      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        document.querySelectorAll(".faq-item").forEach((faqItem) => {
          const faqButton = faqItem.querySelector(".faq-toggle");
          const faqPanel = faqItem.querySelector(".faq-panel");

          if (!faqButton || !faqPanel) {
            return;
          }

          faqItem.classList.remove("is-open");
          faqButton.setAttribute("aria-expanded", "false");
          faqPanel.hidden = true;
        });

        if (!isOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  function initDemoForms() {
    document.querySelectorAll("[data-demo-form]").forEach((form) => {
      if (form.dataset.bound === "true") {
        return;
      }

      const status = form.querySelector("[data-form-status]");
      form.dataset.bound = "true";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
          return;
        }

        if (status) {
          status.dataset.state = "success";
          status.textContent =
            form.dataset.demoForm === "contact"
              ? "Thanks for reaching out. We will reply within two business days."
              : "Thanks for subscribing. Fresh career guidance is headed to your inbox.";
        }

        form.reset();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateYear();
    initAccordion();
    initDemoForms();

    if (CareerShots.initThemeToggle) {
      CareerShots.initThemeToggle();
    }

    if (CareerShots.initNavbar) {
      CareerShots.initNavbar();
    }

    if (CareerShots.initAnimations) {
      CareerShots.initAnimations();
    }
  });
})();
