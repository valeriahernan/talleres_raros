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

const rippleCanvas = document.getElementById("ripple");

if(rippleCanvas){

  const ctx = rippleCanvas.getContext("2d");

  let w, h;

  function resize(){
    w = rippleCanvas.width = window.innerWidth;
    h = rippleCanvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const ripples = [];

  window.addEventListener("mousemove", (e) => {
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      alpha: 0.6
    });
  });

  function animate(){

    ctx.clearRect(0,0,w,h);

    for(let i = 0; i < ripples.length; i++){

      const r = ripples[i];

      r.radius += 3;
      r.alpha *= 0.96;

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

      ctx.strokeStyle = `rgba(186,125,255,${r.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      if(r.alpha < 0.01){
        ripples.splice(i,1);
        i--;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}