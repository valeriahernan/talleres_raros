/* =========================
   ELEMENTOS BASE
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

const menu = document.querySelector(".menu-container");
const hotzone = document.querySelector(".menu-hotzone");

/* =========================
   SCENES SYSTEM
========================= */
function showScene(id) {
  scenes.forEach(s => s.classList.remove("active"));
  const target = document.querySelector(id);
  if (target) target.classList.add("active");
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href");
    showScene(id);
  });
});

/* =========================
   MENU (INSTALLATION MODE)
========================= */

let isMobile = window.innerWidth <= 900;
let menuVisible = false;

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

/* DESKTOP: esquina inferior izquierda */
function handleMouse(e) {
  if (isMobile) return;

  const x = e.clientX;
  const y = e.clientY;

  const nearZone =
    x < 280 &&
    y > window.innerHeight - 260;

  if (nearZone) showMenu();
  else hideMenu();
}

/* MOBILE: tap toggle */
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
   HERO LETTER EFFECT (FIXED)
========================= */
function initHeroEffect() {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  const state = Array.from(letters).map(el => ({
    el,
    x: 0,
    y: 0,
    rot: 0,
    scale: 1,
    tx: 0,
    ty: 0,
    trot: 0,
    tscale: 1
  }));

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    state.forEach(s => {
      const r = s.el.getBoundingClientRect();

      const dx = (r.left + r.width / 2) - mouse.x;
      const dy = (r.top + r.height / 2) - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;

      if (dist < maxDist) {
        const f = 1 - dist / maxDist;

        s.tx = dx * f * 0.35;
        s.ty = dy * f * 0.35;
        s.trot = s.tx * 0.5;
        s.tscale = 1 + f * 0.2;
      } else {
        s.tx = 0;
        s.ty = 0;
        s.trot = 0;
        s.tscale = 1;
      }

      s.x += (s.tx - s.x) * 0.12;
      s.y += (s.ty - s.y) * 0.12;
      s.rot += (s.trot - s.rot) * 0.12;
      s.scale += (s.tscale - s.scale) * 0.12;

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
   INIT
========================= */
window.addEventListener("DOMContentLoaded", () => {
  initHeroEffect();
});