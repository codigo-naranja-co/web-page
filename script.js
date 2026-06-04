const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector(".menu-toggle");
const year = document.querySelector("[data-year]");
const loaderScreen = document.querySelector("[data-loader-screen]");

const LOADER_DURATION = 2550;
const LOADER_FORCE_CLOSE = 4200;
let loaderClosed = false;
let loaderForceTimer = null;

const hideLoader = () => {
  if (!loaderScreen || loaderClosed) return;
  loaderClosed = true;
  if (loaderForceTimer) {
    window.clearTimeout(loaderForceTimer);
  }
  loaderScreen.classList.add("is-hidden");
  document.body.classList.remove("is-loading");
};

const playLoaderSequence = () => {
  if (!loaderScreen) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    setTimeout(hideLoader, 220);
    return;
  }

  window.setTimeout(hideLoader, LOADER_DURATION);
};

const initLoader = () => {
  if (!loaderScreen) return;
  loaderForceTimer = window.setTimeout(hideLoader, LOADER_FORCE_CLOSE);
  playLoaderSequence();
};

if (year) {
  year.textContent = new Date().getFullYear();
}

initLoader();

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menu && menuToggle) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    closeMenu();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
      closeMenu();
    }
  });
}
