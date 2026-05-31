const scenes = document.querySelectorAll(".scene");
const links = document.querySelectorAll(".nav-menu a");
const stage = document.querySelector(".stage");
const sidebar = document.querySelector(".sidebar");
const mobileBtn = document.getElementById("mobile-menu-btn");

/* =========================
   CAMBIAR ESCENA
========================= */

function showScene(id){

  // apagar todas las escenas
  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  // activar escena objetivo
  const target = document.querySelector(id);

  if(target){
    target.classList.add("active");

    // reset scroll interno (IMPORTANTE)
    const scroll = target.querySelector(".scene-scroll");
    if(scroll){
      scroll.scrollTop = 0;
    }
  }

  // actualizar nav activo
  links.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === id){
      link.classList.add("active");
    }
  });
}

/* =========================
   CLICK NAV
========================= */

links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = link.getAttribute("href");
    showScene(target);

    // cerrar menú mobile si está abierto
    if(window.innerWidth < 900 && sidebar){
      sidebar.style.display = "none";
    }
  });
});

/* =========================
   INIT
========================= */

showScene("#hero");

/* =========================
   MOBILE MENU
========================= */

if(mobileBtn){
  mobileBtn.addEventListener("click", () => {

    if(!sidebar) return;

    const isHidden = sidebar.style.display === "none" || sidebar.style.display === "";

    if(isHidden){
      sidebar.style.display = "flex";
      sidebar.style.position = "fixed";
      sidebar.style.top = "60px";
      sidebar.style.left = "0";
      sidebar.style.width = "100%";
      sidebar.style.height = "auto";
      sidebar.style.flexDirection = "row";
      sidebar.style.justifyContent = "space-around";
      sidebar.style.background = "#d6d6d6";
      sidebar.style.zIndex = "99999";
    } else {
      sidebar.style.display = "none";
    }
  });
}

/* =========================
   ACTIVE LINK ON LOAD
========================= */

window.addEventListener("load", () => {
  showScene("#hero");
});