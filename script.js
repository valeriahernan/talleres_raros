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
// FADE IN SECTIONS
// =========================================================

const sections =
  document.querySelectorAll(".section");

if(sections.length){

  const observer =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

        }

      });

    },{
      threshold:0.12
    });

  sections.forEach((section) => {

    observer.observe(section);

  });

}

// =========================================================
// ACTIVE MENU LINK
// =========================================================

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

// =========================================================
// CUSTOM CURSOR
// =========================================================

const cursor =
  document.querySelector(".cursor");

const follower =
  document.querySelector(".cursor-follower");

if(
  window.matchMedia("(pointer:fine)").matches &&
  cursor &&
  follower
){

  document.addEventListener("mousemove", (e) => {

    const x = e.clientX;
    const y = e.clientY;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    follower.style.left = `${x}px`;
    follower.style.top = `${y}px`;

  });

  // =========================================================
  // HOVER
  // =========================================================

  document.querySelectorAll(
    "a, button, .work-item, .poster"
  ).forEach((el) => {

    el.addEventListener("mouseenter", () => {

      follower.classList.add("hover");

    });

    el.addEventListener("mouseleave", () => {

      follower.classList.remove("hover");

    });

  });

  // =========================================================
  // MAGNETIC EFFECT
  // =========================================================

  document.querySelectorAll(
    "a, button"
  ).forEach((item) => {

    item.addEventListener("mousemove", (e) => {

      const rect =
        item.getBoundingClientRect();

      const itemCenterX =
        rect.left + rect.width / 2;

      const itemCenterY =
        rect.top + rect.height / 2;

      const deltaX =
        (e.clientX - itemCenterX) * 0.08;

      const deltaY =
        (e.clientY - itemCenterY) * 0.08;

      item.style.transform =
        `translate(${deltaX}px, ${deltaY}px)`;

    });

    item.addEventListener("mouseleave", () => {

      item.style.transform = "";

    });

  });

  // =========================================================
  // HIDE CURSOR
  // =========================================================

  document.addEventListener("mouseleave", () => {

    cursor.style.opacity = "0";
    follower.style.opacity = "0";

  });

  document.addEventListener("mouseenter", () => {

    cursor.style.opacity = "1";
    follower.style.opacity = "1";

  });

}

// =========================================================
// HERO PARALLAX
// =========================================================

const heroObject =
  document.querySelector(".hero-object");

window.addEventListener("scroll", () => {

  if(heroObject){

    const scrollY =
      window.scrollY * 0.08;

    heroObject.style.transform =
      `translateY(calc(-50% + ${scrollY}px))`;

  }

});

// =========================================================
// ASCII FX
// =========================================================

const canvas =
  document.getElementById("canvas");

if(canvas){

  const ctx =
    canvas.getContext("2d");

  canvas.width =
    window.innerWidth;

  canvas.height =
    window.innerHeight;

  const chars = "01";
  const fontSize = 16;

  const columns =
    canvas.width / fontSize;

  const drops =
    Array(Math.floor(columns)).fill(1);

  function draw(){

    ctx.fillStyle =
      "rgba(255,255,255,0.04)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.fillStyle =
      "#7dff72";

    ctx.font =
      fontSize + "px monospace";

    drops.forEach((y,i) => {

      const text =
        chars[
          Math.floor(
            Math.random() * chars.length
          )
        ];

      ctx.fillText(
        text,
        i * fontSize,
        y * fontSize
      );

      if(
        y * fontSize > canvas.height &&
        Math.random() > 0.975
      ){

        drops[i] = 0;

      }

      drops[i]++;

    });

  }

  setInterval(draw, 33);

}