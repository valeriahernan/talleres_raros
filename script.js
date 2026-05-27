/* =========================================================
   MENU TOGGLE
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if(menuToggle && navMenu){

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

  });

}

/* =========================================================
   WORKSHOP DATA
========================================================= */

const workshops = [

  {
    title: "Taller 01",
    image: "images/t0.png",
    description:
      "Exploración visual y experimental enfocada en composición, imagen y procesos colectivos."
  },

  {
    title: "Taller 02",
    image: "images/t1.png",
    description:
      "Instancia abierta de creación visual, referencias gráficas y conversación interdisciplinaria."
  },

  {
    title: "Taller 03",
    image: "images/t2.png",
    description:
      "Workshop dedicado a procesos editoriales, identidad visual y narrativa contemporánea."
  },

  {
    title: "Taller 04",
    image: "images/t3.png",
    description:
      "Laboratorio experimental enfocado en arte digital, diseño y materialidad visual."
  },

  {
    title: "Taller 05",
    image: "images/t4.png",
    description:
      "Encuentro colaborativo para desarrollar ideas visuales y ejercicios curatoriales."
  },

  {
    title: "Taller 06",
    image: "images/t5.png",
    description:
      "Espacio de experimentación artística y producción visual contemporánea."
  }

];

/* =========================================================
   MODAL
========================================================= */

const modal = document.querySelector(".work-modal");

const modalImage = document.querySelector("#modal-image");

const modalTitle = document.querySelector("#modal-title");

const modalDescription = document.querySelector("#modal-description");

const closeModal = document.querySelector(".close-modal");

/* =========================================================
   OPEN MODAL
========================================================= */

document.querySelectorAll(".work-item").forEach(item => {

  item.addEventListener("click", () => {

    const index = item.dataset.work;

    const data = workshops[index];

    if(!data) return;

    modalImage.src = data.image;

    modalTitle.textContent = data.title;

    modalDescription.textContent = data.description;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

  });

});

/* =========================================================
   CLOSE MODAL
========================================================= */

function closeWorkshopModal(){

  modal.classList.remove("active");

  document.body.style.overflow = "auto";

}

if(closeModal){

  closeModal.addEventListener("click", closeWorkshopModal);

}

/* =========================================================
   CLOSE WITH BACKGROUND CLICK
========================================================= */

if(modal){

  modal.addEventListener("click", (e) => {

    if(e.target === modal){

      closeWorkshopModal();

    }

  });

}

/* =========================================================
   CLOSE WITH ESC
========================================================= */

document.addEventListener("keydown", (e) => {

  if(e.key === "Escape"){

    closeWorkshopModal();

  }

});

/* =========================================================
   RIPPLE BACKGROUND
========================================================= */

const canvas = document.getElementById("ripple-canvas");

const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas(){

  width = canvas.width = window.innerWidth;

  height = canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

/* =========================================================
   RIPPLE ARRAY
========================================================= */

const ripples = [];

/* =========================================================
   MOUSE MOVE
========================================================= */

window.addEventListener("mousemove", (e) => {

  ripples.push({

    x:e.clientX,

    y:e.clientY,

    radius:0,

    alpha:0.08

  });

});

/* =========================================================
   ANIMATION
========================================================= */

function animateRipples(){

  ctx.clearRect(0,0,width,height);

  ripples.forEach((ripple,index) => {

    ripple.radius += 1.2;

    ripple.alpha -= 0.0015;

    ctx.beginPath();

    ctx.arc(
      ripple.x,
      ripple.y,
      ripple.radius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = `rgba(0,153,140,${ripple.alpha})`;

    ctx.lineWidth = 1;

    ctx.stroke();

    if(ripple.alpha <= 0){

      ripples.splice(index,1);

    }

  });

  requestAnimationFrame(animateRipples);

}

animateRipples();