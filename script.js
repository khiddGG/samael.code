/* ═══════════════════════════════════════════
   CORE SETUP
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   REVEAL ON SCROLL (staggered)
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   🎯 HERO SPOTLIGHT (mouse-tracking glow)
   ═══════════════════════════════════════════ */
const heroSection = document.querySelector(".hero");
const spotlight = document.getElementById("heroSpotlight");

if (heroSection && spotlight) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.left = x + "px";
    spotlight.style.top = y + "px";
  });
}

/* ═══════════════════════════════════════════
   ✨ FLOATING PARTICLES
   ═══════════════════════════════════════════ */
const canvas = document.getElementById("heroParticles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  const PARTICLE_COUNT = 45;

  function resizeCanvas() {
    const section = canvas.parentElement;
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    };
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 92, 255, ${p.opacity})`;
      ctx.fill();

      // move
      p.x += p.vx;
      p.y += p.vy;

      // wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    // draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 92, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  resizeCanvas();
  initParticles();
  drawParticles();
}

/* ═══════════════════════════════════════════
   📊 SKILL BARS ANIMATE ON SCROLL
   ═══════════════════════════════════════════ */
const bars = document.querySelectorAll(".bar");

bars.forEach((bar) => {
  const inner = bar.querySelector("div");
  if (inner) {
    // Store the target width and set CSS variable
    const targetWidth = inner.style.width;
    bar.style.setProperty("--bar-width", targetWidth);
  }
});

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

bars.forEach((bar) => barObserver.observe(bar));

/* ═══════════════════════════════════════════
   💎 3D TILT ON HERO CARD
   ═══════════════════════════════════════════ */
const heroCard = document.querySelector(".hero-card");

if (heroCard) {
  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    heroCard.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
    heroCard.style.transition = "transform 0.5s ease";
  });

  heroCard.addEventListener("mouseenter", () => {
    heroCard.style.transition = "transform 0.1s ease";
  });
}