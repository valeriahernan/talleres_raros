// =========================
// FADE-IN AL HACER SCROLL
// =========================
const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.12 });

sections.forEach((section) => observer.observe(section));


// =========================
// MENÚ: SECCIÓN ACTIVA
// =========================
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});


// =========================
// FORMULARIO SUSCRIPCIÓN
// =========================
const form = document.getElementById("subscribe-form");
const successMsg = document.getElementById("success-msg");

if (form && successMsg) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        successMsg.style.display = "block";
        form.reset();

        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);
    });
}


// =========================
// TOGGLE MENÚ MÓVIL
// =========================
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const navList = nav ? nav.querySelector("ul") : null;

if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navList.classList.remove("show");
        });
    });
}


// =========================
// PARALLAX SUAVE GALERÍA
// =========================
const galleryImages = document.querySelectorAll(".gallery-item");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;

    galleryImages.forEach((img, i) => {
        const speed = 0.01 + (i * 0.0025);
        img.style.transform = `translateY(${scrollTop * speed}px)`;
    });
});


// =========================
// CURSOR ANIMADO
// =========================
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");
const cursorText = document.querySelector(".cursor-text");

if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        followerX += (mouseX - followerX) * 0.14;
        followerY += (mouseY - followerY) * 0.14;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover general en links y botones
    document.querySelectorAll("a, button, #menu-toggle").forEach((el) => {
        el.addEventListener("mouseenter", () => {
            follower.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
            follower.classList.remove("hover");
        });
    });

    // Hero mode
    const hero = document.querySelector(".hero");

    if (hero) {
        hero.addEventListener("mouseenter", () => {
            cursor.classList.add("hero-mode");
            follower.classList.add("hero-mode");
        });

        hero.addEventListener("mouseleave", () => {
            cursor.classList.remove("hero-mode");
            follower.classList.remove("hero-mode");
        });
    }

    // Galería + VIEW
    document.querySelectorAll(".gallery-item").forEach((item) => {
        item.addEventListener("mouseenter", () => {
            follower.classList.add("gallery-mode");
            if (cursorText) cursorText.textContent = "VIEW";
            triggerGlitch();
        });

        item.addEventListener("mouseleave", () => {
            follower.classList.remove("gallery-mode");
            if (cursorText) cursorText.textContent = "";
        });
    });

    // Efecto magnético
    const magneticItems = document.querySelectorAll("a, button, .instagram-btn, #menu-toggle");

    magneticItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const itemCenterX = rect.left + rect.width / 2;
            const itemCenterY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - itemCenterX) * 0.15;
            const deltaY = (e.clientY - itemCenterY) * 0.15;

            item.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            follower.classList.add("magnetic");
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "";
            follower.classList.remove("magnetic");
        });
    });

    // Glitch
    function triggerGlitch() {
        follower.classList.remove("glitch");
        void follower.offsetWidth;
        follower.classList.add("glitch");
    }

    document.querySelectorAll(".gallery-item, .hero h1, .logo").forEach((el) => {
        el.addEventListener("mouseenter", triggerGlitch);
    });

    // Ocultar cursor al salir de la ventana
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        follower.style.opacity = "1";
    });
}