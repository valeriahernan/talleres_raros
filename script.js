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
// ACTIVE SECTION
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

  let mouseX = 0;
  let mouseY = 0;

  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left =
      `${mouseX}px`;

    cursor.style.top =
      `${mouseY}px`;

  });

  // =========================================================
  // FOLLOWER ANIMATION
  // =========================================================

  function animateFollower(){

    followerX +=
      (mouseX - followerX) * 0.12;

    followerY +=
      (mouseY - followerY) * 0.12;

    follower.style.left =
      `${followerX}px`;

    follower.style.top =
      `${followerY}px`;

    requestAnimationFrame(
      animateFollower
    );

  }

  animateFollower();

  // =========================================================
  // HOVER EFFECT
  // =========================================================

  document.querySelectorAll(
    "a, button, .poster, .work-item"
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



;