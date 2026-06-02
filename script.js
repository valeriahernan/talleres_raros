
/* =========================
   CLICK FIX (safe)
========================= */

document.addEventListener("click", () => {}, { passive: true });

/* =========================
   SCENES SYSTEM
========================= */

const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

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
  });
});

// init
showScene("#hero");

/* =========================
   TRAIL (STABLE + OPTIMIZED)
========================= */

const container = document.getElementById("trail-container");

let lastX = 0;
let lastY = 0;
let lastTime = 0;

const MAX_DOTS = 40;

document.addEventListener("mousemove", (e) => {

  const now = performance.now();

  // throttle (evita lag y rompe-input)
  if (now - lastTime < 16) return;
  lastTime = now;

  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

  if (dist > 3) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    container.appendChild(dot);

    // auto-remove
    setTimeout(() => {
      dot.remove();
    }, 600);

    // limit DOM size (CRÍTICO)
    if (container.children.length > MAX_DOTS) {
      container.removeChild(container.firstChild);
    }

    lastX = e.clientX;
    lastY = e.clientY;
  }
});

/* =========================
   MOBILE MENU
========================= */

const mobileBtn = document.getElementById("mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");

if (mobileBtn && sidebar) {

  mobileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

}

mobileBtn.addEventListener("click", () => {
  console.log("MENU CLICK");
  sidebar.classList.toggle("active");
});