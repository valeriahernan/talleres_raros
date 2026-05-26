// =========================================================
// MENU TOGGLE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  const toggle =
    document.getElementById("menuToggle");

  const nav =
    document.getElementById("navMenu");

  if(toggle && nav){

    toggle.addEventListener("click", () => {

      nav.classList.toggle("active");

    });

  }

});

// =========================================================
// RIPPLE EFFECT
// =========================================================

const canvas =
  document.getElementById("ripple-canvas");

const ctx =
  canvas.getContext("2d");

let ripples = [];

function resizeCanvas(){

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

}

resizeCanvas();

window.addEventListener(
  "resize",
  resizeCanvas
);

// =========================================================
// MOUSE RIPPLE
// =========================================================

window.addEventListener("mousemove", (e) => {

  ripples.push({

    x:e.clientX,
    y:e.clientY,

    radius:0,

    alpha:1

  });

});

// =========================================================
// DRAW
// =========================================================

function animate(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ripples.forEach((ripple,index) => {

    ripple.radius += 2.5;

    ripple.alpha -= 0.015;

    ctx.beginPath();

    ctx.arc(
      ripple.x,
      ripple.y,
      ripple.radius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle =
      `rgba(0,255,120,${ripple.alpha})`;

    ctx.lineWidth = 1;

    ctx.stroke();

    if(ripple.alpha <= 0){

      ripples.splice(index,1);

    }

  });

  requestAnimationFrame(
    animate
  );

}

animate();

// =========================================================
// ACTIVE SECTION
// =========================================================

const sections =
  document.querySelectorAll(".section");

const navLinks =
  document.querySelectorAll(".nav-menu a");

function updateActiveSection(){

  let current = "";

  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 140;

    const sectionHeight =
      section.offsetHeight;

    if(
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ){

      current =
        section.getAttribute("id");

    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if(
      link.getAttribute("href") === `#${current}`
    ){

      link.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  updateActiveSection
);

window.addEventListener(
  "load",
  updateActiveSection
);