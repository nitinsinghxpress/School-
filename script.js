// script.js

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const preloader = document.getElementById("preloader");
  const regPopup = document.getElementById("regPopup");
  const mainNav = document.getElementById("mainNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  // -------------------------------------------------
  // Navbar toggler: 3 lines -> X
  // -------------------------------------------------
  if (navbarToggler) {
    navbarToggler.innerHTML = `
      <span class="menu-icon" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .navbar-toggler{
        border: none;
        box-shadow: none !important;
        padding: .45rem .6rem;
        width: 50px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .navbar-toggler:focus{
        box-shadow: none !important;
      }

      .menu-icon{
        width: 26px;
        height: 20px;
        position: relative;
        display: inline-block;
      }

      .menu-icon span{
        position: absolute;
        left: 0;
        width: 100%;
        height: 2.8px;
        border-radius: 999px;
        background: #111;
        transition: transform .25s ease, top .25s ease, opacity .2s ease;
      }

      .menu-icon span:nth-child(1){ top: 0; }
      .menu-icon span:nth-child(2){ top: 8.5px; }
      .menu-icon span:nth-child(3){ top: 17px; }

      .navbar-toggler.open .menu-icon span:nth-child(1){
        top: 8.5px;
        transform: rotate(45deg);
      }

      .navbar-toggler.open .menu-icon span:nth-child(2){
        opacity: 0;
      }

      .navbar-toggler.open .menu-icon span:nth-child(3){
        top: 8.5px;
        transform: rotate(-45deg);
      }
    `;
    document.head.appendChild(style);

    navbarToggler.addEventListener("click", () => {
      navbarToggler.classList.toggle("open");
    });
  }

  // -------------------------------------------------
  // Keep dropdowns open; close only on normal links
  // -------------------------------------------------
  if (mainNav) {
    const collapseInstance = bootstrap.Collapse.getOrCreateInstance(mainNav, {
      toggle: false
    });

    mainNav.querySelectorAll("a.nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const isDropdownToggle = link.classList.contains("dropdown-toggle");
        const isInsideDropdownMenu = link.closest(".dropdown-menu");

        // Do not close menu for dropdown toggles or dropdown items
        if (isDropdownToggle || isInsideDropdownMenu) return;

        // Close only on normal links
        if (mainNav.classList.contains("show")) {
          collapseInstance.hide();
          navbarToggler?.classList.remove("open");
        }
      });
    });

    mainNav.addEventListener("hidden.bs.collapse", () => {
      navbarToggler?.classList.remove("open");
    });
  }

  // -------------------------------------------------
  // Preloader
  // -------------------------------------------------
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) preloader.classList.add("hide");
      body.classList.remove("locked");
    }, 700);
  });

  // -------------------------------------------------
  // Popup functions
  // -------------------------------------------------
  window.openRegPopup = function () {
    if (!regPopup) return;
    regPopup.classList.add("show");
    regPopup.setAttribute("aria-hidden", "false");
    body.classList.add("locked");
  };

  window.closeRegPopup = function () {
    if (!regPopup) return;
    regPopup.classList.remove("show");
    regPopup.setAttribute("aria-hidden", "true");
    body.classList.remove("locked");
  };

  // Auto-open popup after page load
  setTimeout(() => {
    window.openRegPopup();
  }, 1200);

  // Click outside popup card closes it
  if (regPopup) {
    regPopup.addEventListener("click", (e) => {
      if (e.target === regPopup) {
        window.closeRegPopup();
      }
    });
  }

  // Escape key closes popup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      window.closeRegPopup();
    }
  });
});