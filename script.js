/* =========================
   ELEMENTOS
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const menu = document.querySelector(".menu-container");
const hotzone = document.querySelector(".menu-hotzone");
let isMobile = window.innerWidth <= 900;
let menuVisible = false;
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
    const targetId = link.getAttribute("href");
    showScene(targetId);

    hideMenu();
  });
});

/* =========================
   MENU SYSTEM (INSTALACIÓN)
========================= */

function showMenu() {
  if (!menu) return;
  menu.classList.add("visible");
  menuVisible = true;
}

function hideMenu() {
  if (!menu) return;
  menu.classList.remove("visible");
  menuVisible = false;
}

/* DESKTOP ZONE (mouse esquina inferior izquierda) */
window.addEventListener("mousemove", (e) => {
  if (isMobile) return;

  const nearCorner =
    e.clientX < 260 &&
    e.clientY > window.innerHeight - 220;

  if (nearCorner) showMenu();
  else hideMenu();
});

/* MOBILE: tap toggle */
window.addEventListener("click", () => {
  if (!isMobile) return;
  menuVisible ? hideMenu() : showMenu();
});

window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 900;
  hideMenu();
});

/* DESKTOP: esquina inferior izquierda */
function handleMouse(e) {
  if (isMobile) return;

  const nearCorner =
    e.clientX < 260 &&
    e.clientY > window.innerHeight - 220;

  if (nearCorner) showMenu();
  else hideMenu();
}

/* MOBILE: toggle */
function handleTouch() {
  if (!isMobile) return;

  menuVisible ? hideMenu() : showMenu();
}

window.addEventListener("mousemove", handleMouse);
hotzone?.addEventListener("click", handleTouch);

window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 900;
  hideMenu();
});

/* =========================
   HERO TEXT EFFECT (FIXED)
========================= */
function initHeroEffect() {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const states = [...letters].map(el => ({
    el,
    x: 0, y: 0,
    rot: 0,
    scale: 1,
    tx: 0, ty: 0,
    trot: 0,
    tscale: 1
  }));

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    states.forEach(s => {
      const r = s.el.getBoundingClientRect();

      const dx = (r.left + r.width / 2) - mouse.x;
      const dy = (r.top + r.height / 2) - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 180;

      if (dist < max) {
        const f = 1 - dist / max;

        s.tx = dx * f * 0.35;
        s.ty = dy * f * 0.35;
        s.trot = s.tx * 0.6;
        s.tscale = 1 + f * 0.2;
      } else {
        s.tx = s.ty = s.trot = 0;
        s.tscale = 1;
      }

      s.x += (s.tx - s.x) * 0.1;
      s.y += (s.ty - s.y) * 0.1;
      s.rot += (s.trot - s.rot) * 0.1;
      s.scale += (s.tscale - s.scale) * 0.1;

      s.el.style.transform = `
        translate(${s.x}px, ${s.y}px)
        rotate(${s.rot}deg)
        scale(${s.scale})
      `;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* =========================
   LANGUAGE
========================= */
let currentLang = "es";
const btn = document.getElementById("langBtn");

function setLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  if (btn) btn.textContent = lang === "es" ? "EN" : "ES";

  currentLang = lang;
  localStorage.setItem("lang", lang);
}

function initLanguage() {
  if (!btn) return;

  btn.addEventListener("click", () => {
    setLanguage(currentLang === "es" ? "en" : "es");
  });

  const saved = localStorage.getItem("lang");
  if (saved) setLanguage(saved);
}

/* =========================
   INIT
========================= */
window.addEventListener("DOMContentLoaded", () => {
  initHeroEffect();
  initLanguage();
});