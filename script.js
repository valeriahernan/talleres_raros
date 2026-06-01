
/* =========================
   CLICK FIX (safe)
========================= */

document.addEventListener("click", () => {}, { passive: true });

/* =========================
   SCENES SYSTEM
========================= */

const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");

function setActiveLink(hash) {
  links.forEach(l => {
    if (l.getAttribute("href") === hash) {
      l.classList.add("active");
    } else {
      l.classList.remove("active");
    }
  });
}

function showScene(id) {
  scenes.forEach(scene => scene.classList.remove("active"));

  const target = document.querySelector(id);

  if (target) {
    target.classList.add("active");
    setActiveLink(id);
  }
}

/* NAV CLICK */
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("href");
    showScene(target);

    // close sidebar on mobile (important UX)
    sidebar?.classList.remove("active");
  });
});

/* INIT */
showScene("#hero");

/* =========================
   MOBILE MENU FIX (FALTABA ESTO)
========================= */

const btn = document.getElementById("mobile-menu-btn");
const sidebar = document.querySelector(".sidebar");

if (btn && sidebar) {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* =========================
   TRAIL (OPTIMIZED + MOBILE SAFE)
========================= */
const text = "TALLERES RAROS";
const STEP = 18;

document.addEventListener("mousemove", (e) => {

  const now = performance.now();

  if (now - lastTime < 16) return;
  lastTime = now;

  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

  if (dist > STEP) {

    const dot = document.createElement("div");
    dot.className = "trail-dot";

    // 🔥 AQUÍ está el cambio clave
    dot.textContent = text;

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    container.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 800);

    if (container.children.length > MAX_DOTS) {
      container.removeChild(container.firstChild);
    }

    lastX = e.clientX;
    lastY = e.clientY;
  }
});

}