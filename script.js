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
   CURSOR EFFECT
========================= */

const cursor = document.querySelector(".custom-cursor");

const symbols = [
  "♫", "⋆", "｡", "♪", "₊˚", "♬", "ﾟ", "."
];

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  createMusicSparkle(e.clientX, e.clientY);
});

function createMusicSparkle(x, y) {
  const el = document.createElement("div");

  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  el.style.position = "fixed";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.fontSize = (Math.random() * 14 + 10) + "px";
  el.style.color = randomColor();
  el.style.pointerEvents = "none";
  el.style.zIndex = "99998";
  el.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(el);

  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 2 + 0.5;

  let life = 0;

  function animate() {
    life++;

    const dx = Math.cos(angle) * velocity * life;
    const dy = Math.sin(angle) * velocity * life - life * 0.2;

    el.style.left = x + dx + "px";
    el.style.top = y + dy + "px";
    el.style.opacity = 1 - life / 50;

    if (life < 50) {
      requestAnimationFrame(animate);
    } else {
      el.remove();
    }
  }

  requestAnimationFrame(animate);
}

function randomColor() {
  const colors = [
    "#ba7dff",
    "#ffffff",
    "#ff7bd1",
    "#7df9ff",
    "#ffd36e"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}