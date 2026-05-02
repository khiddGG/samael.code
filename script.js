const yearEl = document.getElementById("year");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const nav = document.getElementById("nav");

yearEl.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

const savedTheme = localStorage.getItem("theme");

// DEFAULT = DARK
if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  syncThemeIcon("light");
} else {
  // force dark
  document.documentElement.removeAttribute("data-theme");
  syncThemeIcon("");
}

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";

  if (next) {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }

  syncThemeIcon(next);
});

function syncThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  if (!icon) return;

  if (theme === "light") {
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }
}

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));