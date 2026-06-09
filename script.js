
/* =========================
   ELEMENTOS
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

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
  });
});

/* =========================
   HERO TEXT EFFECT
========================= */
function initHeroEffect() {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };

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
}

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

  if (btn) {
    btn.textContent = lang === "es" ? "EN" : "ES";
  }

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


const menu = document.querySelector(".menu-container");
const hotzone = document.querySelector(".menu-hotzone");

let isMobile = window.innerWidth <= 900;

// DESKTOP: mouse tracking
function handleMouse(e) {
  if (isMobile) return;

  const x = e.clientX;
  const y = e.clientY;

  const active = x < 300 && y > window.innerHeight - 250;

  menu?.classList.toggle("visible", active);
}

// MOBILE: tap zone
function handleTouch() {
  if (!isMobile) return;

  menu?.classList.toggle("visible");
}

// eventos
window.addEventListener("mousemove", handleMouse);
hotzone?.addEventListener("click", handleTouch);

// update resize
window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 900;
});