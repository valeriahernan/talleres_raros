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
/* =========================
   GSAP CURSOR
========================= */

function initCursor() {

  if (typeof gsap === "undefined") return;

  const cursorEl = document.querySelector(".cursor");
  const cursorText = document.querySelector(".cursor-paragraph");
  const cursorDot = document.getElementById("cursorDot");

  const trail = document.getElementById("cursorTrailPath");

  let points = [];

  const dotX = gsap.quickTo(cursorDot, "x", {
    duration: 0.15,
    ease: "power3.out"
  });

  const dotY = gsap.quickTo(cursorDot, "y", {
    duration: 0.15,
    ease: "power3.out"
  });

  const cursorX = gsap.quickTo(cursorEl, "x", {
    duration: 0.2,
    ease: "power3.out"
  });

  const cursorY = gsap.quickTo(cursorEl, "y", {
    duration: 0.2,
    ease: "power3.out"
  });

  document.addEventListener("mousemove", e => {

    dotX(e.clientX);
    dotY(e.clientY);

    cursorX(e.clientX + 12);
    cursorY(e.clientY + 12);

    points.push({
      x: e.clientX,
      y: e.clientY,
      t: performance.now()
    });

    const now = performance.now();

    points = points.filter(
      p => now - p.t < 180
    );

    if (points.length > 20)
      points = points.slice(-20);

    if (points.length > 1) {

      let d = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {

        const prev = points[i - 1];
        const curr = points[i];

        const mx = (prev.x + curr.x) / 2;
        const my = (prev.y + curr.y) / 2;

        d += ` Q ${prev.x} ${prev.y} ${mx} ${my}`;
      }

      trail.setAttribute("d", d);
    }
  });

  document.querySelectorAll("a, button, h3").forEach(el => {

    el.addEventListener("mouseenter", () => {

      if (cursorText)
        cursorText.textContent = "✦";

      gsap.to(cursorEl, {
        scale: 1.2,
        duration: .2
      });

    });

    el.addEventListener("mouseleave", () => {

      if (cursorText)
        cursorText.textContent = "";

      gsap.to(cursorEl, {
        scale: 1,
        duration: .2
      });

    });

  });

}

window.addEventListener("DOMContentLoaded", initCursor);