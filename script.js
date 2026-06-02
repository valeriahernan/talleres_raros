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
  mobileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* =========================
   ESC CLOSE
========================= */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("active")) {
    sidebar.classList.remove("active");
  }
});

/* =========================
   HERO TITLE REACTION
========================= */

window.addEventListener("DOMContentLoaded", () => {

  const letters = document.querySelectorAll(".hero-title span");

  if (!letters.length) return;

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function animate() {

    letters.forEach((letter) => {

      const rect = letter.getBoundingClientRect();

      const lx = rect.left + rect.width / 2;
      const ly = rect.top + rect.height / 2;

      const dx = lx - mouse.x;
      const dy = ly - mouse.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 180;

      if (dist < maxDist && dist !== 0) {

        const force = (1 - dist / maxDist);

        const moveX = dx * force * 0.25;
        const moveY = dy * force * 0.25;

        const rotate = moveX * 0.6;

        letter.style.transform =
          `translate(${moveX}px, ${moveY}px)
           rotate(${rotate}deg)
           scale(${1 + force * 0.15})`;

      } else {
        letter.style.transform = "translate(0,0) rotate(0) scale(1)";
      }

    });

    requestAnimationFrame(animate);
  }

  animate();

});


new cursoreffects.rainbowCursor({
  length: 14,
  colors: ["#ba7dff", "#ffffff"]
});