/* =========================
   ELEMENTOS
========================= */
const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");
const desktopToggle = document.getElementById("menuToggle");
const langBtn = document.getElementById("langBtn");

/* =========================
   SCENES SYSTEM
========================= */
function showScene(id) {
  let found = false;

  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.querySelector(id);
  if (target) {
    target.classList.add("active");
    found = true;
  }

  // fallback seguro
  if (!found) {
    document.querySelector("#hero")?.classList.add("active");
  }
}

/* =========================
   NAV LINKS
========================= */
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    showScene(targetId);

    // cerrar sidebar (unificado)
    sidebar?.classList.remove("active");
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
    sidebar.classList.toggle("active");
  });
}

/* =========================
   CLOSE ON ESC
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    sidebar?.classList.remove("active");
  }
});

/* =========================
   CLICK OUTSIDE SIDEBAR (FIXED)
========================= */
document.addEventListener("click", (e) => {
  if (!sidebar) return;

  const isMobile = window.innerWidth <= 900;
  if (!isMobile) return;

  const clickedInsideSidebar = sidebar.contains(e.target);
  const clickedMobileBtn = e.target === mobileBtn;

  if (!clickedInsideSidebar && !clickedMobileBtn) {
    sidebar.classList.remove("active");
  }
});

/* =========================
   HERO TEXT EFFECT (OPTIMIZED)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: 0, y: 0 };

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
  }, { passive: true });

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
   CURSOR EFFECT (SAFE)
========================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    if (!window.cursoreffects?.rainbowCursor) return;

    try {
      new window.cursoreffects.rainbowCursor({
        length: 20,
        colors: ["#ba7dff", "#ff4ecd", "#00f0ff"]
      });
    } catch (err) {
      console.warn("Cursor effect error:", err);
    }
  }, 800);
});

/* =========================
   LANGUAGE TOGGLE
========================= */
let currentLang = "es";

function setLanguage(lang) {
  document.querySelectorAll("[data-es]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  if (langBtn) {
    langBtn.textContent = lang === "es" ? "EN" : "ES";
  }

  currentLang = lang;
  localStorage.setItem("lang", lang);
}

langBtn?.addEventListener("click", () => {
  setLanguage(currentLang === "es" ? "en" : "es");
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang");
  if (saved) setLanguage(saved);
});