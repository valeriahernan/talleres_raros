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
  scenes.forEach(scene => scene.classList.remove("active"));
  const target = document.querySelector(id);
  if (target) target.classList.add("active");
}

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showScene(link.getAttribute("href"));
    if (window.innerWidth <= 900) {
      sidebar?.classList.remove("active");
    }
  });
});

/* =========================
   MOBILE MENU
========================= */
const mobileBtn = document.getElementById("mobile-menu-btn");

if (mobileBtn && sidebar) {
  mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita conflictos con eventos globales de clic
    sidebar.classList.toggle("active");
  });
}

/* =========================
   CLOSE SIDEBAR EVENTS
========================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
});

// Cierra el menú móvil si el usuario hace clic fuera de la barra lateral
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 900 && sidebar?.classList.contains("active")) {
    if (!sidebar.contains(e.target) && e.target !== mobileBtn) {
      sidebar.classList.remove("active");
    }
  }
});

/* =========================
   HERO TITLE REACTION (Lerp Optimizado)
========================= */
window.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero-title span");
  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // Almacena el estado de transformación actual y objetivo de cada letra para suavizar el movimiento
  const letterStates = Array.from(letters).map(letter => ({
    element: letter,
    currentX: 0, currentY: 0, currentRot: 0, currentScale: 1,
    targetX: 0,  targetY: 0,  targetRot: 0,  targetScale: 1
  }));

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {
    letterStates.forEach((state) => {
      const rect = state.element.getBoundingClientRect();
      const lx = rect.left + rect.width / 2 - state.currentX; // Base sin transformación previa
      const ly = rect.top + rect.height / 2 - state.currentY;

      const dx = lx - mouse.x;
      const dy = ly - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;

      if (dist < maxDist && dist !== 0) {
        const force = (1 - dist / maxDist);
        
        // Configura los valores objetivo basados en la distancia física
        state.targetX = dx * force * 0.35;
        state.targetY = dy * force * 0.35;
        state.targetRot = state.targetX * 0.7;
        state.targetScale = 1 + force * 0.20;
      } else {
        // Retorno elástico a la posición base
        state.targetX = 0;
        state.targetY = 0;
        state.targetRot = 0;
        state.targetScale = 1;
      }

      // Interpolación lineal (Lerp) para suavizar la transición (0.1 = velocidad de suavizado)
      state.currentX += (state.targetX - state.currentX) * 0.1;
      state.currentY += (state.targetY - state.currentY) * 0.1;
      state.currentRot += (state.targetRot - state.currentRot) * 0.1;
      state.currentScale += (state.targetScale - state.currentScale) * 0.1;

      state.element.style.transform = `
        translate(${state.currentX}px, ${state.currentY}px) 
        rotate(${state.currentRot}deg) 
        scale(${state.currentScale})
      `;
    });

    requestAnimationFrame(animate);
  }

  animate();
});

/* =========================
   RAINBOW CURSOR INITIALIZATION
========================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    // Si el canvas global ya existe, evitamos duplicados accidentales
    if (document.getElementById("custom-rainbow-canvas")) return;

    if (!window.cursoreffects?.rainbowCursor) {
      console.warn("cursor-effects no cargó correctamente.");
      return;
    }

    // Creamos un canvas limpio antes de disparar la librería
    const targetCanvas = document.createElement("canvas");
    targetCanvas.id = "custom-rainbow-canvas";
    document.body.appendChild(targetCanvas);

    // Inicializamos el efecto vinculándolo directamente a este lienzo seguro
    new cursoreffects.rainbowCursor({
      element: targetCanvas,
      length: 22,
      colors: ["#ba7dff", "#ffffff", "#ff4ecd", "#00f0ff"]
    });
  }, 400);
});

