
const isMobile = window.matchMedia(
  "(hover: none), (pointer: coarse), (max-width:900px)"
).matches;



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
window.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;
  if (isMobile) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let isScatter = false;

  const states = Array.from(letters).map(letter => {
    const rect = letter.getBoundingClientRect();

    return {
      el: letter,

      // posición base (IMPORTANTE)
      baseX: 0,
      baseY: 0,

      // posición actual
      x: 0,
      y: 0,
      rot: 0,
      scale: 1,

      // targets
      tx: 0,
      ty: 0,
      trot: 0,
      tscale: 1
    };
  });

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // 💣 FUNCIÓN DE EXPLOSIÓN
  function scatterLetters() {
    isScatter = true;

    states.forEach(state => {
      const x = (Math.random() - 0.5) * window.innerWidth * 1.5;
      const y = (Math.random() - 0.5) * window.innerHeight * 1.5;
      const rot = (Math.random() - 0.5) * 720;

      state.tx = x;
      state.ty = y;
      state.trot = rot;
      state.tscale = 1;
    });
  }

  // 🔁 volver a orden
  function resetLetters() {
    isScatter = false;

    states.forEach(state => {
      state.tx = 0;
      state.ty = 0;
      state.trot = 0;
      state.tscale = 1;
    });
  }

  // 👉 ejemplo: click en hero activa explosión
  document.querySelector(".hero-title").addEventListener("click", () => {
    if (!isScatter) scatterLetters();
    else resetLetters();
  });

  function animate() {
    states.forEach(state => {
      const rect = state.el.getBoundingClientRect();

      // 💡 solo aplica mouse effect si NO está en scatter
      if (!isScatter) {
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
          state.tx *= 0.9;
          state.ty *= 0.9;
          state.trot *= 0.9;
          state.tscale = 1;
        }
      }

      // easing
      state.x += (state.tx - state.x) * 0.08;
      state.y += (state.ty - state.y) * 0.08;
      state.rot += (state.trot - state.rot) * 0.08;
      state.scale += (state.tscale - state.scale) * 0.08;

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
  "♫", "⋆", "｡", "♪", "𝄢˚", "♬", "ﾟ", "❀",
  "♫", "⋆", "✴︎", "♪", "✧˚", "♬", "✴︎", "✩"
];

// 🔥 control de cantidad de partículas
let lastTime = 0;
const delay = 90; // ↑ más alto = menos partículas

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  const now = Date.now();

  if (now - lastTime > delay) {
    createDrop(e.clientX, e.clientY);
    lastTime = now;
  }
});

function createDrop(x, y) {
  const el = document.createElement("div");

  el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

  el.style.position = "fixed";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.fontSize = (Math.random() * 16 + 10) + "px";
  el.style.color = randomColor();
  el.style.pointerEvents = "none";
  el.style.zIndex = "99998";
  el.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(el);

  let posY = y;
  let posX = x;

  const drift = (Math.random() - 0.5) * 0.2; // menos caos
  const speed = Math.random() * 0.8 + 0.3;   // caída suave

  let opacity = 1;

  function fall() {
    posY += speed;
    posX += drift;

    // 🌫️ fade más suave
    opacity *= 0.95;

    el.style.top = posY + "px";
    el.style.left = posX + "px";
    el.style.opacity = opacity;

    if (opacity > 0 && posY < window.innerHeight + 200) {
      requestAnimationFrame(fall);
    } else {
      el.remove();
    }
  }

  requestAnimationFrame(fall);
}

function randomColor() {
  const colors = ["#ba7dff", "#8f7bffbb"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const video = document.getElementById("heroVideo");

if (video) {

    video.pause();

    video.addEventListener("loadedmetadata", () => {

        let targetTime = 0;
        let currentTime = 0;

        document.addEventListener("mousemove", (e) => {

            const progress = e.clientX / window.innerWidth;

            targetTime = progress * video.duration;

        });

        function animateVideo() {

            currentTime += (targetTime - currentTime) * 0.08;

            video.currentTime = currentTime;

            requestAnimationFrame(animateVideo);

        }

        animateVideo();

    });

}