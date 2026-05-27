/* =========================================================
   MENU TOGGLE (MOBILE)
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

/* =========================================================
   SCROLL SPY (MENÚ ACTIVO SEGÚN SECCIÓN)
========================================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => observer.observe(section));

/* =========================================================
   ACTIVE LINK STYLE (INYECTADO SI NO EXISTE EN CSS)
========================================================= */

const style = document.createElement("style");
style.innerHTML = `
.nav-menu a.active{
  color: white;
  background: var(--accent);
  padding: 2px 4px;
}
`;
document.head.appendChild(style);

/* =========================================================
   SMOOTH CLOSE MENU ON CLICK (MOBILE UX)
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

/* =========================================================
   MODAL (BASE SIMPLE)
========================================================= */

const modal = document.querySelector(".work-modal");
const closeModal = document.querySelector(".close-modal");

if (modal && closeModal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

/* =========================================================
   FUTURO: GLB HOOK (LISTO PARA INTERACCIÓN)
   → aquí después podemos hacer que el modelo cambie
     según la sección activa
========================================================= */

let currentSection = null;

observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSection = entry.target.id;

      // DEBUG
      console.log("Sección activa:", currentSection);

      // aquí después podemos conectar:
      // cambio de luz del model-viewer
      // o rotación distinta por sección
    }
  });
}, { threshold: 0.6 });

sections.forEach(section => observer2.observe(section));