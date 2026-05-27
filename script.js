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
      "Este taller se propone como una iniciación a la producción musical con énfasis en la creación musical digital, destacando la autodeterminación creativa que este proceso permite más allá de los medios técnicos o los conocimientos teóricos. Incentivando una aproximación DIY (do it yourself) a estos recursos, se enseñará el uso de herramientas estándar de producción musical en un software de audio, incentivando la experimentación creativa de éstas, el potencial creativo de las limitaciones y del no-saber-hacer. Con contenidos progresivos y jerarquizados, se guiará el trabajo de las distintas sesiones a la producción de un registro  musical de lxs participantes, que culminará con la recopilación y publicación de estos resultados en un compilado que será distribuido gratuitamente a través de las distintas plataformas digitales de Talleres Raros."  
    },

  {
    title: "Taller 02",
    image: "images/t1.png",
    description:
      "Taller enfocado en la creación de letras para canciones, donde se facilitarán herramientas y ejercicios que permitan a lxs talleristas encontrar una voz lírica propia y mecanismos para desarrollar ideas escriturales, vencer el “bloqueo de escritura”, etc. En el taller, además, se entregará material didáctico para trabajar en la forma de pistas de acceso libre y originales, producidas especialmente para que puedan ser usadas por lxs talleristas, en caso de necesitarlas."
  },

  {
    title: "Taller 03",
    image: "images/t2.png",
    description:
      "Este taller busca indagar en los recursos de composición disponibles en la producción musical desde el computador, posicionándolo como instrumento creativo central. En sesiones en formato de workshops prácticos, se indagarán técnicas de diseño y experimentación sonora, exploración textural y técnicas de música generativa (perspectivas nuevas en torno al samplear, al MIDI, a la aleatoriedad, entre otras)"
  },

  {
    title: "Taller 04",
    image: "images/t3.png",
    description:
      "Este taller se propone como una iniciación a la creación musical digital para personas trans, planteando perspectivas tanto críticas como prácticas en torno a la grabación y la producción, y buscando dar un espacio para compartir problemáticas, perspectivas y experiencias personales en torno a la producción que son particulares para las identidades disidentes. Se contempla la discusión en torno a la representación del cuerpo, la voz y referentes musicales trans; demostraciones prácticas de cómo armar una primera maqueta en Ableton Live; para finalizar con un taller grupal en donde compartir y comentar los ejercicios creados."
  },

  {
    title: "Taller 05",
    image: "images/t4.png",
    description:
      "Masterclass Javiera Electra."
  },

  {
    title: "Taller 06",
    image: "images/t5.png",
    description:
      "Masterclass Lilen."
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