const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

const menu = document.querySelector(".menu-container");
const hotzone = document.querySelector(".menu-hotzone");

let isMobile = window.innerWidth <= 900;
let menuVisible = false;

/* SCENES */
function showScene(id) {
  scenes.forEach(s => s.classList.remove("active"));

  const target = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (target) target.classList.add("active");
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));
  });
});

/* MENU */
function showMenu() {
  menu?.classList.add("visible");
  menuVisible = true;
}

function hideMenu() {
  menu?.classList.remove("visible");
  menuVisible = false;
}

/* DESKTOP hover zone */
function handleMouse(e) {
  if (isMobile) return;

  const nearCorner =
    e.clientX < 250 && e.clientY > window.innerHeight - 200;

  nearCorner ? showMenu() : hideMenu();
}

/* MOBILE toggle */
function toggleMenu() {
  if (!isMobile) return;
  menuVisible ? hideMenu() : showMenu();
}

/* EVENTS */
window.addEventListener("mousemove", handleMouse);

hotzone?.addEventListener("click", toggleMenu);

window.addEventListener("resize", () => {
  isMobile = window.innerWidth <= 900;
  hideMenu();
});

/* HERO EFFECT */
function initHero() {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };

  const states = [...letters].map(el => ({
    el, x: 0, y: 0, rot: 0, scale: 1
  }));

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    states.forEach(s => {
      const r = s.el.getBoundingClientRect();

      const dx = r.left + r.width / 2 - mouse.x;
      const dy = r.top + r.height / 2 - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 180;

      let tx = 0, ty = 0, trot = 0, tscale = 1;

      if (dist < max) {
        const f = 1 - dist / max;
        tx = dx * f * 0.3;
        ty = dy * f * 0.3;
        trot = tx * 0.5;
        tscale = 1 + f * 0.2;
      }

      s.x += (tx - s.x) * 0.1;
      s.y += (ty - s.y) * 0.1;
      s.rot += (trot - s.rot) * 0.1;
      s.scale += (tscale - s.scale) * 0.1;

      s.el.style.transform =
        `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg) scale(${s.scale})`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

window.addEventListener("DOMContentLoaded", () => {
  initHero();
});