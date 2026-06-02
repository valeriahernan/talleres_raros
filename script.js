/* =========================
   CLICK FIX (safe)
========================= */

document.addEventListener("click", () => {}, { passive: true });

/* =========================
   SCENES SYSTEM
========================= */

const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");

function showScene(id) {

  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.querySelector(id);

  if (target) {
    target.classList.add("active");
  }

}

links.forEach(link => {

  link.addEventListener("click", (e) => {

    e.preventDefault();

    const target = link.getAttribute("href");

    showScene(target);

    // cerrar menú en móvil
    if (window.innerWidth <= 900) {
      sidebar?.classList.remove("active");
    }

  });

});

/* =========================
   hero title movement
========================= */

const title = document.querySelector('.hero-title');

title.innerHTML = title.textContent
  .split('')
  .map(letter =>
    letter === ' '
      ? ' '
      : `<span>${letter}</span>`
  )
  .join('');

/* INIT */

showScene("#hero");

/* =========================
   TRAIL
========================= */

const container = document.getElementById("trail-container");

let lastX = 0;
let lastY = 0;
let lastTime = 0;

const MAX_DOTS = 40;

/* desactivar trail en móviles */

const isTouch = window.matchMedia("(pointer: coarse)").matches;

if (!isTouch && container) {

  document.addEventListener("mousemove", (e) => {

    const now = performance.now();

    if (now - lastTime < 16) return;

    lastTime = now;

    const dist = Math.hypot(
      e.clientX - lastX,
      e.clientY - lastY
    );

    if (dist > 3) {

      const dot = document.createElement("div");

      dot.className = "trail-dot";

      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";

      container.appendChild(dot);

      setTimeout(() => {
        dot.remove();
      }, 600);

      if (container.children.length > MAX_DOTS) {
        container.removeChild(container.firstChild);
      }

      lastX = e.clientX;
      lastY = e.clientY;

    }

  });

}

/* =========================
   MOBILE MENU
========================= */

const mobileBtn = document.getElementById("mobile-menu-btn");

if (mobileBtn && sidebar) {

  mobileBtn.addEventListener("click", () => {

    console.log("MENU CLICK");

    sidebar.classList.toggle("active");

  });

}

/* =========================
   ESC CLOSE
========================= */

document.addEventListener("keydown", (e) => {

  if (
    e.key === "Escape" &&
    sidebar?.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
  }

});