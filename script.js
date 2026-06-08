/* =========================
   CLICK FIX
========================= */
document.addEventListener("click", () => {}, { passive: true });

/* =========================
   ELEMENTOS
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");
const desktopToggle = document.getElementById("menuToggle");

/* =========================
   SCENES SYSTEM
========================= */
function showScene(id) {
  scenes.forEach(scene => scene.classList.remove("active"));
  const target = document.querySelector(id);
  if (target) target.classList.add("active");
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));

    sidebar?.classList.remove("active");
    sidebar?.classList.remove("open");
  });
});

/* =========================
   MOBILE MENU
========================= */
if (mobileBtn && sidebar) {
  mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("active");
  });
}

/* =========================
   DESKTOP TOGGLE MENU
========================= */
if (desktopToggle && sidebar) {
  desktopToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar.classList.toggle("open");
  });
}

/* =========================
   CLOSE EVENTS
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sidebar?.classList.remove("active");
    sidebar?.classList.remove("open");
  }
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 900 && sidebar?.classList.contains("active")) {
    if (!sidebar.contains(e.target) && e.target !== mobileBtn) {
      sidebar.classList.remove("active");
    }
  }
});

/* =========================
   HERO TEXT EFFECT
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const states = Array.from(letters).map(letter => ({
    el: letter,
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    tx: 0,
    ty: 0,
    trot: 0,
    tscale: 1
  }));

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    states.forEach(state => {
      const rect = state.el.getBoundingClientRect();

      const dx = rect.left + rect.width / 2 - mouse.x;
      const dy = rect.top + rect.height / 2 - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 180;

      if (dist < maxDist) {
        const force = 1 - dist / maxDist;
        state.tx = dx * force * 0.35;
        state.ty = dy * force * 0.35;
        state.trot = state.tx * 0.6;
        state.tscale = 1 + force * 0.2;
      } else {
        state.tx = 0;
        state.ty = 0;
        state.trot = 0;
        state.tscale = 1;
      }

      state.x += (state.tx - state.x) * 0.1;
      state.y += (state.ty - state.y) * 0.1;
      state.rot += (state.trot - state.rot) * 0.1;
      state.scale += (state.tscale - state.scale) * 0.1;

      state.el.style.transform = `
        translate(${state.x}px, ${state.y}px)
        rotate(${state.rot}deg)
        scale(${state.scale})
      `;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

/* =========================
   LANGUAGE TOGGLE
========================= */
let currentLang = "es";
const btn = document.getElementById("langBtn");

function setLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  btn.textContent = lang === "es" ? "EN" : "ES";
  currentLang = lang;

  localStorage.setItem("lang", lang);
}

btn?.addEventListener("click", () => {
  setLanguage(currentLang === "es" ? "en" : "es");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  if (saved) setLanguage(saved);
});

/* =========================
   CUSTOM CURSOR
========================= */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateCursor() {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;

  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* Hover links */
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => {
    follower.style.transform =
      "translate(-50%, -50%) scale(1.8)";
  });

  el.addEventListener("mouseleave", () => {
    follower.style.transform =
      "translate(-50%, -50%) scale(1)";
  });
});