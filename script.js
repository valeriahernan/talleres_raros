const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav-link");
const navList = document.querySelector("#nav ul");
const menuToggle = document.getElementById("menu-toggle");
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const cursorText = document.getElementById("cursor-text");

// FADE-IN SECCIONES
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.1 });
sections.forEach(s => observer.observe(s));

// MENÚ MÓVIL
if (menuToggle && navList) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navList.classList.toggle("show");
    });
    document.addEventListener("click", () => navList.classList.remove("show"));
}

// CURSOR ANIMADO (Solo Desktop)
// CURSOR ANIMADO + PARALLAX RESORTES (Solo Desktop)
if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
        // 1. Mueve el cursor, el seguidor y el texto
        cursor.style.left = follower.style.left = cursorText.style.left = `${e.clientX}px`;
        cursor.style.top = follower.style.top = cursorText.style.top = `${e.clientY}px`;

        // 2. Parallax suave para los resortes (Efecto profundidad)
        const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        
        document.querySelectorAll(".float-img").forEach((img, index) => {
            // Cada resorte se mueve a una velocidad un poco distinta (index * 0.01)
            const factor = 1 + (index * 0.5); 
            img.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    });

    // Eventos de Hover para links y botones
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", () => follower.classList.add("hover"));
        el.addEventListener("mouseleave", () => follower.classList.remove("hover"));
    });

    // Eventos de Hover para la galería (Muestra el texto "VIEW")
    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("mouseenter", () => {
            follower.classList.add("gallery-mode");
            cursorText.textContent = "VIEW";
        });
        item.addEventListener("mouseleave", () => {
            follower.classList.remove("gallery-mode");
            cursorText.textContent = "";
        });
    });
}


// FORMULARIO
const form = document.getElementById("subscribe-form");
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("success-msg").style.display = "block";
        form.reset();
    });
}
