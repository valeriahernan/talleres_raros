const sections = document.querySelectorAll(".section");
const links = document.querySelectorAll(".nav-menu a");

/* =========================
   CAMBIAR ESCENA
========================= */
function setScene(id){

  sections.forEach(section => {
    section.classList.remove("active");
  });

  const target = document.querySelector(id);

  if(target){
    target.classList.add("active");
  }

  // opcional: marca link activo
  links.forEach(l => l.classList.remove("active"));
  const activeLink = document.querySelector(`.nav-menu a[href="${id}"]`);
  if(activeLink){
    activeLink.classList.add("active");
  }
}

/* =========================
   INICIO
========================= */
setScene("#hero");

/* =========================
   NAVEGACIÓN MENÚ
========================= */
links.forEach(link => {

  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href");

    setScene(id);

    // opcional UX mobile: cerrar menú si lo tienes toggle
    document.querySelector(".nav-menu")?.classList.remove("active");
  });

});